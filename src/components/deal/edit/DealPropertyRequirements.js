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
            errors:[]
        }
        this.typeSubtypeComponentObj = null;
    }
    onChangeHandler(event){

    }
    render() {
        let isDisable = false;
        let property = {}
        return (
            <div className='deal_property_requirements'>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <TypeSubtypeDropdown disable={isDisable} label={'Property Type/Subtype *'} data={property.type_subtypes ? property.type_subtypes : [] } onReady={ tsDropdown => this.typeSubtypeComponentObj = tsDropdown }/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="property_tenancy" options={Helper.tenancyOptions()} errors={this.state.errors}  value={property.property_tenancy} onChange={this.onChangeHandler.bind(this)} label="Tenancy" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable} name="property_submarket" errors={this.state.errors}  value={property.property_submarket} onChange={this.onChangeHandler.bind(this)} label="Submarket(s)" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable} name="property_zoning" errors={this.state.errors}  value={property.property_zoning} onChange={this.onChangeHandler.bind(this)} label="Zoning" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DealPropertyRequirements;