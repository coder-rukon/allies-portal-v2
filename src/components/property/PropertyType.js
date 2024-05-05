import React, { Component } from 'react';
import InputRadio from '../forms/inputradio';
import Input from '../forms/Input';

class PropertyType extends Component {
    constructor(props){
        super(props);
        this.state = {
            property:{}
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
        this.setState({
            property:this.props.property
        })
    }
    setProperty(property){
        this.setState({
            property:property
        })
    }
    getPropertyFields(){
        let property = this.state.property;
        let output = {}
        this.getAvailableFields().forEach( item => {
            output[item.id] = property[item.id]
        })
        return output
    }
    onPropertyChangeHanlder(event){
        let property = this.state.property;
        this.setState({
            property: {
                ...property,
                [event.target.name]:event.target.value
            }
        })
    }

    onPropertyRentTypeChange(event,value){
        let property = this.state.property;
        this.setState({
           
            property:{
                ...property,
                property_type:event.target.value
            }
        })
    }
    getAvailableFields(){
        return[
            { id: 'property_size', 'label' : 'Size' },
            { id: 'property_acres', 'label' : 'Size' },
            { id: 'property_zoning', 'label' : 'Size' },
            { id: 'property_private_offices', 'label' : 'Size' },
            { id: 'property_bathrooms', 'label' : 'Size' },
            { id: 'property_parking_ratio', 'label' : 'Size' },
            { id: 'property_of_suites', 'label' : 'Size' },
            { id: 'property_clear_height', 'label' : 'Size' },
            { id: 'property_dock_doors', 'label' : 'Size' },
            { id: 'property_drive_in_doors', 'label' : 'Size' },
            { id: 'property_year_built', 'label' : 'Size' },
            { id: 'property_year_renovated', 'label' : 'Size' },
            { id: 'property_class', 'label' : 'Size' },
            { id: 'property_min_space', 'label' : 'Size' },
            { id: 'property_max_contiguous_space', 'label' : 'Size' },
            { id: 'property_submarket', 'label' : 'Size' },
            { id: 'property_lease_rate', 'label' : 'Size' },
            { id: 'property_vehicles_per_day', 'label' : 'Size' },
            { id: 'property_retail_type', 'label' : 'Size' },
            { id: 'property_available_utilities', 'label' : 'Size' }
        ]
    }
    getSpaceFields(allowField){
        let property = this.state.property;
        let disable= this.props.disable === true ? true : false;
        return(
            <>
                {( allowField == 'property_size') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable}  onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_size" label="Size" value={property.property_size}/></div> :''}
                {( allowField == 'property_acres') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable}  onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_acres" label="Acres" value={property.property_acres}/></div> :''}
                {( allowField == 'property_zoning') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable}  onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_zoning" label="Zoning" value={property.property_zoning}/></div> :''}
                {( allowField == 'property_private_offices') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable}  onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_private_offices" label="# of Private Offices" value={property.property_private_offices}/></div> :''}
                {( allowField == 'property_bathrooms') ? <div className="col-xs-12 col-sm-6"><Input disable = {disable}  onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_bathrooms" label="# Bathrooms" value={property.property_bathrooms}/></div> :''}
                {( allowField == 'property_parking_ratio') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_parking_ratio" label="Parking Ratio" value={property.property_parking_ratio}/></div> :''}
                {( allowField == 'property_of_suites') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_of_suites" label="# of Suites" value={property.property_of_suites}/></div> :''}
                {( allowField == 'property_clear_height') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_clear_height" label="Clear Height" value={property.property_clear_height}/></div> :''}
                {( allowField == 'property_dock_doors') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_dock_doors" label="# of Dock Doors" value={property.property_dock_doors}/></div> :''}
                {( allowField == 'property_drive_in_doors') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_drive_in_doors" label="# of Drive-In Doors" value={property.property_drive_in_doors}/></div> :''}
                {( allowField == 'property_year_built') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_year_built" label="Year Built" value={property.property_year_built}/></div> :''}
                {( allowField == 'property_year_renovated') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_year_renovated" label="Year Renovated" value={property.property_year_renovated}/></div> :''}
                {( allowField == 'property_class') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_class" label="Class" value={property.property_class}/></div> :''}
                {( allowField == 'property_min_space') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_min_space" label="Min Space" value={property.property_min_space}/></div> :''}
                {( allowField == 'property_max_contiguous_space') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_max_contiguous_space" label="Max Contiguous Space" value={property.property_max_contiguous_space}/></div> :''}
                {( allowField == 'property_submarket') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_submarket" label="Submarket" value={property.property_submarket}/></div> :''}
                {( allowField == 'property_lease_rate') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_lease_rate" label="Lease Rate" value={property.property_lease_rate}/></div> :''}
                {( allowField == 'property_vehicles_per_day') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_vehicles_per_day" label="Vehicles Per Day" value={property.property_vehicles_per_day}/></div> :''}
                {( allowField == 'property_retail_type') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_retail_type" label="Retail Type" value={property.property_retail_type}/></div> :''}
                {( allowField == 'property_available_utilities') ? <div className="col-xs-12 col-sm-6"><Input  disable = {disable} onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_available_utilities" label="Available Utilities" value={property.property_available_utilities}/></div> :''}
            </>
        )
    }
    render() {
        let property = this.state.property;
        let disable= this.props.disable === true ? true : false;
        return (
            <div>
                <div className="d-flex property_category_nav">
                    <div><InputRadio disable = {disable} checked={ property.property_type == 'industrial' ? true : false } onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="industrial" title="Industrial"/></div>
                    <div><InputRadio disable = {disable} checked={property.property_type == 'office' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="office" title="Office"/></div>
                    <div><InputRadio disable = {disable} checked={property.property_type == 'retail' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="retail" title="Retail"/></div>
                    <div><InputRadio disable = {disable} checked={property.property_type == 'land' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="land" title="land"/></div>
                </div>
                { property.property_type =='industrial' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                { property.property_type =='office' ? <div className="row">{['property_size','property_acres','property_zoning', 'property_private_offices','property_bathrooms','property_parking_ratio','property_suites','property_class','property_min_space','property_max_contiguous_space','property_year_built','property_year_renovated','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                { property.property_type =='retail' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                { property.property_type =='land' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
            </div>
        );
    }
}

export default PropertyType;