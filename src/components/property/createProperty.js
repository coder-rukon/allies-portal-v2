import { Component } from "react";
import Input from "../forms/Input";
import BorderBox from "../widget/borderbox";
import Dropdown from "../forms/Dropdown";
import InputRadio from "../forms/inputradio";
import Settings from "@/inc/Settings";
class CreatePropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property:{},
            state:{}
        }
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
                property_rent_type:event.target.value
            }
        })
    }    
    onPropertyDropdownChangeHandler(){
        
    }
    onPropertyDropdownChangeHandler(){
        
    }
    getSpaceFields(allowField){
        let property = this.state.property;
        return(
            <>
                {( allowField == 'property_size') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_size" label="Size" value={property.property_size}/></div> :''}
                {( allowField == 'property_acres') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_acres" label="Acres" value={property.property_acres}/></div> :''}
                {( allowField == 'property_zoning') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_zoning" label="Zoning" value={property.property_zoning}/></div> :''}
                {( allowField == 'property_private_offices') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_private_offices" label="# of Private Offices" value={property.property_private_offices}/></div> :''}
                {( allowField == 'property_bathrooms') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_bathrooms" label="# Bathrooms" value={property.property_bathrooms}/></div> :''}
                {( allowField == 'property_parking_ratio') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_parking_ratio" label="Parking Ratio" value={property.property_parking_ratio}/></div> :''}
                {( allowField == 'property_of_suites') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_of_suites" label="# of Suites" value={property.property_of_suites}/></div> :''}
                {( allowField == 'property_clear_height') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_clear_height" label="Clear Height" value={property.clear_height}/></div> :''}
                {( allowField == 'property_dock_doors') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_dock_doors" label="# of Dock Doors" value={property.property_dock_doors}/></div> :''}
                {( allowField == 'property_drive_in_doors') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_drive_in_doors" label="# of Drive-In Doors" value={property.property_drive_in_doors}/></div> :''}
                {( allowField == 'property_year_built') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_year_built" label="Year Built" value={property.property_year_built}/></div> :''}
                {( allowField == 'property_year_renovated') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_year_renovated" label="Year Renovated" value={property.property_year_renovated}/></div> :''}
                {( allowField == 'property_class') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_class" label="Class" value={property.property_class}/></div> :''}
                {( allowField == 'property_min_space') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_min_space" label="Min Space" value={property.property_min_space}/></div> :''}
                {( allowField == 'property_max_contiguous_space') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_max_contiguous_space" label="Max Contiguous Space" value={property.property_max_contiguous_space}/></div> :''}
                {( allowField == 'property_submarket') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_submarket" label="Submarket" value={property.property_submarket}/></div> :''}
                {( allowField == 'property_lease_rate') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_lease_rate" label="Lease Rate" value={property.property_lease_rate}/></div> :''}
                {( allowField == 'property_vehicles_per_day') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_vehicles_per_day" label="Vehicles Per Day" value={property.property_vehicles_per_day}/></div> :''}
                {( allowField == 'property_retail_type') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_retail_type" label="Retail Type" value={property.property_retail_type}/></div> :''}
                {( allowField == 'property_available_utilities') ? <div className="col-xs-12 col-sm-6"><Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="property_available_utilities" label="Available Utilities" value={property.property_available_utilities}/></div> :''}
            </>
        )
    }
    render() { 
        let property = this.state.property;
        let listing_type_options = Settings.listingType;
        let listing_status_options = Settings.listingStatus;
        return(
            <div className="property_create_form">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Property Details">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="listing_type" options={listing_type_options} errors={this.state.errors}  value={property.listing_type} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Listing Type*" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="listing_status" options={listing_status_options} errors={this.state.errors}  value={property.listing_status} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Status*" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="address_line_1" label="Company NameAddress Line 1" value={property.address_line_1}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="address_line_2" label="Address Line 2" value={property.address_line_2}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input onChange={this.onPropertyDropdownChangeHandler.bind(this)}  name="city" label="City" value={property.city}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input onChange={this.onPropertyDropdownChangeHandler.bind(this)}  name="state" label="State" value={property.state}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input onChange={this.onPropertyDropdownChangeHandler.bind(this)}  name="county" label="Country" value={property.country}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input onChange={this.onPropertyChangeHanlder.bind(this)}  name="zipcode" label="Zipcode" value={property.zipcode}/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox>
                            <div className="d-flex">
                                <div><InputRadio onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="industrial" title="Industrial"/></div>
                                <div><InputRadio onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="office" title="Office"/></div>
                                <div><InputRadio onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="retail" title="Retail"/></div>
                                <div><InputRadio onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="land" title="land"/></div>
                            </div>
                            { property.property_rent_type =='industrial' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_rent_type =='office' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_rent_type =='retail' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_rent_type =='land' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                        </BorderBox>
                    </div>
                    <div className="col-xs-12 col-sm-6"></div>
                </div>
            </div>
        );
    }
}
 
export default CreatePropertyForm;