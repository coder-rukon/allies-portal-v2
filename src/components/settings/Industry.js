"use client"
import Button from "@/components/forms/button";
import Dropdown from "@/components/forms/Dropdown";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
import Loading from "@/components/widget/Loading";

import Api from "@/inc/Api";
import Settings from "@/inc/Settings";
import React, { Component } from 'react';

class Industry extends Component {
    constructor(props){
        super(props);
        this.state = {
            industry:{
                industry_name:''
            },
            isSaving:false,
            isLoading:false,
            allIndustry:[]
        }
    }
    componentDidMount(){
        this.loadIndustry()
    }
    loadIndustry(){
        let api = Api, that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get('/industry').then(res => {
            that.setState({
                isLoading:false,
                allIndustry:res.data.data
            })
        })
    }
    onChangeIndustry(event){
        let industry = this.state.industry;
        this.setState({
            industry:{
                ...industry,
                [event.target.name]:event.target.value
            }
        })
    }
    onSaveHandler(event){
        this.setState({
            isSaving:true
        })
        let api = Api, that = this;
        let data = this.state.industry;
        api.setUserToken();
        if(data.industry_id){
            api.axios().put('/industry',data).then(res => {
                that.setState({
                    industry:{
                        industry_id:"",
                        industry_name:""
                    },
                    isSaving:false
                })
                that.loadIndustry();
            })
        }else{
            api.axios().post('/industry',data).then(res => {
                that.setState({
                    industry:{
                        industry_id:"",
                        industry_name:""
                    },
                    isSaving:false
                })
                that.loadIndustry();
            })
        }
    }
    getIndustryGroupLabel(industry){
        let groups = Settings.industryGroups;
        let groupLabel = '';
        groups.forEach(groupItem => {
            if(groupItem.value == industry.industry_group){
                groupLabel = groupItem.label;
            }
        })
        return groupLabel;
    }
    makeEditable(industry){
        this.setState({
            industry:industry
        })
    }
    deleteIndustry(industry_id){
        let api = Api, that = this;
        api.setUserToken();
        const params = { industry_id: industry_id };
        api.axios().delete('/industry/',{params}).then(res=>{
            that.loadIndustry();
        })
    }
    industryActionsButton(industry){
        return(
            <div className="d-flex">
                <Button label="Edit" onClick={ event => { this.makeEditable(industry) }}/>
                <Button label="Delete" onClick={ event => { this.deleteIndustry(industry.industry_id) }}/>
            </div>
        )
    }
    render() {
        let gridData= this.state.allIndustry;
        let gridheader = [
            {id:'industry_name',title:'Name'},
            {id:'industry_group',title:'Group name', cellRender : (industryTemp) => { return this.getIndustryGroupLabel(industryTemp) }},
            {id:'action',title:'Action', cellRender : (industry) => { return this.industryActionsButton(industry)  }},
        ]
        let industry = this.state.industry;
        let groupOptions = Settings.industryGroups;
        return (
            <div>
                <div className="d-flex gap-3">
                    <div className="">
                        <Dropdown options={groupOptions} name="industry_group" placeholder="Group Name" value={industry.industry_group} onChange={this.onChangeIndustry.bind(this)}/>
                    </div>
                    <div className="">
                        <Input name="industry_name" placeholder="Industry Name" value={industry.industry_name} onChange={this.onChangeIndustry.bind(this)}/>
                    </div>
                    <div className="">
                        { this.state.isSaving ? <Loading/> : <Button label="Save" onClick={this.onSaveHandler.bind(this)}/> }
                    </div>
                    
                    
                </div>
                {
                    this.state.isLoading ? <Loading/> : <RsGrid header={gridheader} data={gridData}/>
                }
                
            </div>
        );
    }
}

export default Industry;