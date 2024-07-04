"use client"
import Button from "@/components/forms/button";
import Dropdown from "@/components/forms/Dropdown";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
import Loading from "@/components/widget/Loading";
import Api from "@/inc/Api";
import Helper from "@/inc/Helper";
import React, { Component } from 'react';

class PropertySubTypes extends Component {
    constructor(props){
        super(props);
        this.state = {
            subtype:{
                name:''
            },
            isSaving:false,
            isLoading:false,
            allSubTypes:[]
        }
    }
    componentDidMount(){
        this.loadSubTypes()
    }
    loadSubTypes(){
        let api = Api, that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get('/property-subtype').then(res => {
            that.setState({
                isLoading:false,
                allSubTypes:res.data.data
            })
        })
    }
    onChangeHandler(event){
        let subtype = this.state.subtype;
        this.setState({
            subtype:{
                ...subtype,
                [event.target.name]:event.target.value
            }
        })
    }
    onSaveHandler(event){
        this.setState({
            isSaving:true
        })
        let api = Api, that = this;
        let stateData = this.state.subtype;
        let data = {
            ...stateData,
            name:stateData.subtype_name,
            type:stateData.property_type_id,
        };
        api.setUserToken();
        if(data.subtype_id){
            api.axios().put('/property-subtype',data).then(res => {
                that.setState({
                    subtype:{
                        subtype_name:"",
                        property_type_id:""
                    },
                    isSaving:false
                })
                that.loadSubTypes();
            })
        }else{
            api.axios().post('/property-subtype',data).then(res => {

                that.setState({
                    subtype:{
                        subtype_name:"",
                        property_type_id: this.state.subtype?.property_type_id
                    },
                    isSaving:false
                })
                that.loadSubTypes();
            })
        }
    }
    onEditCancleHandler(eev){
        this.setState({
            subtype:{
                subtype_name:"",
                property_type_id:""
            }
        })
    }
    
    makeEditable(subtype){
        this.setState({
            subtype:subtype
        })
        window.scrollTo(0, 0)
    }
    deleteSubtype(subtype_id){
        let api = Api, that = this;
        api.setUserToken();
        const params = { subtype_id: subtype_id };
        api.axios().delete('/property-subtype',{params}).then(res=>{
            that.loadSubTypes();
        })
    }
    actionsButton(subtype){
        return(
            <div className="d-flex justify-content-around">
                <Button label="Edit" onClick={ event => { this.makeEditable(subtype) }}/>
                <Button label="Delete" className="danger" onClick={ event => { this.deleteSubtype(subtype.subtype_id) }}/>
            </div>
        )
    }
    getTypeName(typeGroup){
        let tupeGroup = Helper.getPropertyType(typeGroup.property_type_id);
        return tupeGroup?.label
    }
    render() {
        let gridheader = [
            {id:'subtype_name',title:'Subtype'},
            {id:'property_type_id',title:'Type', cellRender : (typeGroup) => { return this.getTypeName(typeGroup) }},
            {id:'action',title:'Action', cellRender : (industry) => { return this.actionsButton(industry)  }},
        ]
        let subtypesList = this.state.allSubTypes;
        let industryOptions = Helper.getPropertyType().map(item => { return {label:item.label,value:item.pt_id}});
        let subtype = this.state.subtype;
        return (
            <div>
                <div className="d-flex gap-3">
                    <div className="">
                        <Dropdown options={industryOptions} name="property_type_id" placeholder="Type" value={subtype.property_type_id} onChange={this.onChangeHandler.bind(this)}/>
                    </div>
                    <div className="">
                        <Input name="subtype_name" placeholder="Name" value={subtype.subtype_name} onChange={this.onChangeHandler.bind(this)}/>
                    </div>
                    <div className="">
                        { this.state.isSaving ? <Loading/> : <Button label="Save" onClick={this.onSaveHandler.bind(this)}/> }
                        { subtype.subtype_id ? <Button label="Cancel" onClick={this.onEditCancleHandler.bind(this)}/> : ''}
                    </div>
                    
                    
                </div>
                {
                    this.state.isLoading ? <Loading/> : <RsGrid header={gridheader} data={subtypesList}/>
                }
                
            </div>
        );
    }
}

export default PropertySubTypes;