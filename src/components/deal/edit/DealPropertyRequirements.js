import React, { Component } from 'react';
import Helper from "@/inc/Helper";
import Address from '@/components/address/Address';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import Settings from '@/inc/Settings';
import TypeSubtypeDropdown from "@/components/property/typesubtype/TypeSubtypeDropdown";
class DealPropertyRequirements extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors:[],
            property_requirements:{}
        }
        this.typeSubtypeComponentObj = null;
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
        this.setState({
            property_requirements:this.props.data 
        })
    }
    getData(){
        return {

            ...this.state.property_requirements,
            property_type_subtype: this.typeSubtypeComponentObj.getData().map( item => {
                return {
                    property_type_id:item.property_type_id,
                    subtype_id:item.subtype_id,
                }
            })
        }
    }
    onChangeHandler(event){
        let property_requirements = this.state.property_requirements;
        this.setState({
            property_requirements:{
                ...property_requirements,
                [event.target.name] : event.target.value
            }
        })
    }
    render() {
        let isDisable = false;
        let property_requirements = this.state.property_requirements;
        return (
            <div className='deal_property_requirements'>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <TypeSubtypeDropdown disable={isDisable} label={'Property Type/Subtype *'} data={property_requirements.property_type_subtype ? property_requirements.property_type_subtype : [] } onReady={ tsDropdown => this.typeSubtypeComponentObj = tsDropdown }/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="tenancy" options={Helper.tenancyOptions()} errors={this.state.errors}  value={property_requirements.tenancy} onChange={this.onChangeHandler.bind(this)} label="Tenancy" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable} name="submarket" errors={this.state.errors}  value={property_requirements.submarket} onChange={this.onChangeHandler.bind(this)} label="Use" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable} name="zoning" errors={this.state.errors}  value={property_requirements.zoning} onChange={this.onChangeHandler.bind(this)} label="Zoning" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DealPropertyRequirements;