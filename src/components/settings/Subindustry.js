"use client"
import Button from "@/components/forms/button";
import Dropdown from "@/components/forms/Dropdown";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
import Loading from "@/components/widget/Loading";
import Panel from "@/components/widget/panel";

import ActionsTypes from "@/inc/ActionTypes";
import Api from "@/inc/Api";
import Settings from "@/inc/Settings";
import React, { Component } from 'react';

class Subindustry extends Component {
    constructor(props){
        super(props);
        this.state = {
            subindustry:{
                subindustry_name:''
            },
            isSaving:false,
            isLoading:false,
            allIndustry:[],
            allSubindustry:[],
        }
    }
    componentDidMount(){
        this.loadIndustry()
        this.loadSubindustry()
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
    loadSubindustry(){
        let api = Api, that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get('/subindustry').then(res => {
            that.setState({
                isLoading:false,
                allSubindustry:res.data.data
            })
        })
    }
    onChangeSubindustry(event){
        let subindustry = this.state.subindustry;
        this.setState({
            subindustry:{
                ...subindustry,
                [event.target.name]:event.target.value
            }
        })
    }
    onSaveHandler(event){
        this.setState({
            isSaving:true
        })
        let api = Api, that = this;
        let data = this.state.subindustry;
        api.setUserToken();
        if(data.subindustry_id){
            api.axios().put('/subindustry',data).then(res => {
                that.setState({
                    subindustry:{
                        subindustry_id:"",
                        subindustry_name:""
                    },
                    isSaving:false
                })
                that.loadSubindustry();
            })
        }else{
            api.axios().post('/subindustry',data).then(res => {

                that.setState({
                    subindustry:{
                        ...that.state.subindustry,
                        subindustry_name:""
                    },
                    isSaving:false
                })
                that.loadSubindustry();
            })
        }
    }
    onEditCancleHandler(eev){
        this.setState({
            subindustry:{
                subindustry_id:"",
                subindustry_name:""
            }
        })
    }
    getIndustryName(industryArg){
        let allIndustry = this.state.allIndustry;
        let label = '';
        allIndustry.forEach(industry => {
            if(industry.industry_id == industryArg.industry_id){
                label = industry.industry_name;
            }
        })
        return label;
    }
    makeEditable(subindustry){
        this.setState({
            subindustry:subindustry
        })
        window.scrollTo(0, 0)
    }
    deleteSubindustry(subindustry_id){
        let api = Api, that = this;
        api.setUserToken();
        const params = { subindustry_id: subindustry_id };
        api.axios().delete('/subindustry',{params}).then(res=>{
            that.loadSubindustry();
        })
    }
    subindustryActionsButton(subindustry){
        return(
            <div className="d-flex justify-content-around gap-2">
                <Button label="Edit" onClick={ event => { this.makeEditable(subindustry) }}/>
                <Button label="Delete" className="danger" onClick={ event => { this.deleteSubindustry(subindustry.subindustry_id) }}/>
            </div>
        )
    }
    render() {
        let gridheader = [
            {id:'subindustry_name',title:'Sub-industry'},
            {id:'industry_id',title:'Industry', cellRender : (industry) => { return this.getIndustryName(industry) }},
            {id:'action',title:'Action', cellRender : (industry) => { return this.subindustryActionsButton(industry)  }},
        ]
        let subindustryList = this.state.allSubindustry;
        let industryOptions = this.state.allIndustry.map(item => { return {label:item.industry_name,value:item.industry_id}});
        let subindustry = this.state.subindustry;
        return (
            <div>
                <div className="d-flex gap-3">
                    <div className="">
                        <Dropdown options={industryOptions} name="industry_id" placeholder="Industry" value={subindustry.industry_id} onChange={this.onChangeSubindustry.bind(this)}/>
                    </div>
                    <div className="">
                        <Input name="subindustry_name" placeholder="Subindustry Name" value={subindustry.subindustry_name} onChange={this.onChangeSubindustry.bind(this)}/>
                    </div>
                    <div className="">
                        { this.state.isSaving ? <Loading/> : <Button label="Save" onClick={this.onSaveHandler.bind(this)}/> }
                        { this.state.subindustry.subindustry_id ? <Button label="Cancel" onClick={this.onEditCancleHandler.bind(this)}/> : ''}
                    </div>
                    
                    
                </div>
                {
                    this.state.isLoading ? <Loading/> : <RsGrid header={gridheader} data={subindustryList}/>
                }
                
            </div>
        );
    }
}

export default Subindustry;