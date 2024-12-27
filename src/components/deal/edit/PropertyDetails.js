import React, { Component } from 'react';
import Helper from "@/inc/Helper";
import Address from '@/components/address/Address';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import Settings from '@/inc/Settings';
class PropertyDetails extends Component {
    constructor(props){
        super(props);
        this.addressComponent = null;
        this.state = {
            errors:[],
            property:{}
        }
    }
    onPropertyChangeHanlder(event){
        let property = this.state.property;
        this.setState({
            property:{
                ...property,
                [event.target.name]:event.target.value
            }
        })
    }
    onPropertyDropdownChangeHandler(event){
        let property = this.state.property;
        this.setState({
            property:{
                ...property,
                [event.target.name]:event.target.value
            }
        })
    }
    render() {
        let property = {};
        let isDisable = false;
        let listing_status_options = Settings.listingStatus;
        return (
            <div className='property_details_frm'>
                <div className="row">

                    <div className="col-xs-12">
                        <Address disable={isDisable} source="property" integrator={property.property_id} onReady={ obj => {this.addressComponent = obj }}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="property_tenancy" options={Helper.tenancyOptions()} errors={this.state.errors}  value={property.property_tenancy} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Tenancy" />
                    </div>  
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable} name="property_submarket" errors={this.state.errors}  value={property.property_submarket} onChange={this.onPropertyChangeHanlder.bind(this)} label="Submarket" />
                    </div>   
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable}  name="property_size"
                            errors={this.state.errors}  
                            value={property.property_size} 
                            onChange={this.onPropertyChangeHanlder.bind(this)} 
                            label="Size"
                            dropdownValue= {property.property_size_unit}
                            options = {
                                [{ name:'property_size_unit',  disable:isDisable, title:"SF", value:'sf',onChange:this.onPropertyChangeHanlder.bind(this),checked:property.property_size_unit == 'sf' ? true : false },{ name:'property_size_unit', title:"Acre", value:'acre',checked:property.property_size_unit == 'acre' ? true : false,disable:isDisable,onChange:this.onPropertyChangeHanlder.bind(this) }]
                            }
                        />
                    </div>   
                    <div className="col-xs-12 col-sm-6">
                        <Input  
                        name="property_additional_size"
                        disable={isDisable} 
                        dropdownValue= {property.property_additional_size_unit}
                        options = {
                        [{ 
                        disable:isDisable,
                        name:'property_additional_size_unit', 
                        title:"SF",
                        value:'sf',
                        checked:property.property_additional_size_unit == 'sf' ? true : false,onChange:this.onPropertyChangeHanlder.bind(this) },{ name:'property_additional_size_unit', title:"Acre", value:'acre',onChange:this.onPropertyChangeHanlder.bind(this),checked:property.property_additional_size_unit == 'acre' ? true : false }]
                        }
                        errors={this.state.errors}  value={property.property_additional_size } onChange={this.onPropertyChangeHanlder.bind(this)} label="Additional Size (Optional)" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable}   name="property_zoning" errors={this.state.errors}  value={property.property_zoning } onChange={this.onPropertyChangeHanlder.bind(this)} label="Zoning" />
                    </div> 
                    <div className="col-xs-12 col-sm-6">
                        <Input  disable={isDisable}  name="property_cross_street" errors={this.state.errors}  value={property.property_cross_street } onChange={this.onPropertyChangeHanlder.bind(this)} label="Cross Street" />
                    </div> 
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown   name="property_status" disable={isDisable} options={listing_status_options} errors={this.state.errors}  value={property.property_status} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Status*" />
                    </div> 
                </div>
            </div>
        );
    }
}

export default PropertyDetails;