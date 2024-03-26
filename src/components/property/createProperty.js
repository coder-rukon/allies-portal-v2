import { Component } from "react";
import Input from "../forms/Input";
import AjaxSearchInput from "../forms/AjaxSearchInput";
import BorderBox from "../widget/borderbox";
import FileUploader from "../widget/FileUploader";
import Dropdown from "../forms/Dropdown";
import InputRadio from "../forms/inputradio";
import Settings from "@/inc/Settings";
import BrockerForm from './new/BrockerForm';
import Api from "@/inc/Api";
import Button from "../forms/button";
import Loading from "../widget/Loading";
class CreatePropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingProperty:false,
            property:{
                property_rent_type:'industrial'
            },
            brokerObj:null,
            property_owner:{},
            property_tenant:{},
            broker_contacts:[],
            state:{}
        }
    }
    onBrokerFormReady(brokerObject){
        this.setState({
            brokerObj: brokerObject
        })
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
    propertyTenantChangeHandler(event){
        let property_tenant = this.state.property_tenant;
        this.setState({
            property_tenant: {
                ...property_tenant,
                [event.target.name]:event.target.value
            }
        })
    }
    onPropertyOwnerChangeHanlder(event){
        let property_owner = this.state.property_owner;
        this.setState({
            property_owner: {
                ...property_owner,
                [event.target.name]:event.target.value
            }
        })
    }
    onPropertyOwnerSearchHandler(event){
        this.setState({
            p_owner_search:event.target.value
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
    onPropertyCreateHanlder(event){
        
        this.setState({
            isCreatingProperty:true
        })

        let data = {
            ...this.state.property,
            property_owner:this.state.property_owner,
            property_tenant:this.state.property_tenant,
            broker_contacts:this.state.brokerObj ? this.state.brokerObj.getBrokers() : [],
        };
        let api = Api, that = this;
        if(api.setUserToken()){
            api.axios().post('/property/create',data).then(res=> {
                that.setState({
                    isCreatingProperty:false
                })
                console.log(res)
            }).catch(errors => {
                that.setState({
                    isCreatingProperty:false
                })
                console.log(errors)
            })
        }
        
    }
    onCompanyOwnerItemClick(company){
        this.setState({
            property_owner:company
        })
    }
    onCompanyTenantItemClick(company){
        this.setState({
            property_tenant:company
        })
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
        let property_owner = this.state.property_owner;
        let property_tenant = this.state.property_tenant;
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
                            <div className="d-flex property_category_nav">
                                <div><InputRadio checked={ property.property_rent_type == 'industrial' ? true : false } onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="industrial" title="Industrial"/></div>
                                <div><InputRadio checked={property.property_rent_type == 'office' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="office" title="Office"/></div>
                                <div><InputRadio checked={property.property_rent_type == 'retail' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="retail" title="Retail"/></div>
                                <div><InputRadio checked={property.property_rent_type == 'land' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_rent_type" value="land" title="land"/></div>
                            </div>
                            { property.property_rent_type =='industrial' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_rent_type =='office' ? <div className="row">{['property_size','property_acres','property_zoning', 'property_private_offices','property_bathrooms','property_parking_ratio','property_suites','property_class','property_min_space','property_max_contiguous_space','property_year_built','property_year_renovated','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_rent_type =='retail' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_rent_type =='land' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                        </BorderBox>
                        <BorderBox title="Note">
                            <Input name="property_note" value={property.property_note} onChange={this.onPropertyChangeHanlder.bind(this)}  type="textarea"/>
                        </BorderBox>
                        <BorderBox title="Files">
                            <FileUploader id="upload_files"/>
                        </BorderBox>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Property Owner">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12">
                                    <AjaxSearchInput name="s_company" sUrl="/propertyholder/search" filterResult = { data => { return data.propertyholders.map( (item => { return {...item,item_label:item.propertyholder_company} }) ) }  } onItemClick={this.onCompanyOwnerItemClick.bind(this)} placeholder="Search existing company"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_company" label="Company" value={property_owner.propertyholder_company}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_contact" label="Contact" value={property_owner.propertyholder_contact}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_title" label="Title" value={property_owner.propertyholder_title}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_phone" label="Phone" value={property_owner.propertyholder_phone}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_website" label="Website" value={property_owner.propertyholder_website}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_email" label="Email" value={property_owner.propertyholder_email}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_address_line_1" label="Address Line 1" value={property_owner.propertyholder_address_line_1}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_address_line_2" label="Address Line 2" value={property_owner.propertyholder_address_line_2}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_city" label="City" value={property_owner.propertyholder_city}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_state" label="State" value={property_owner.propertyholder_state}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_country" label="Country" value={property_owner.propertyholder_country}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_owner.propertyholder_id} className="disable_with_border" onChange={this.onPropertyOwnerChangeHanlder.bind(this)}  name="propertyholder_zip_code" label="Zip Code" value={property_owner.propertyholder_zip_code}/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox title="Property Tenant">
                            <div className="row">
                                
                                <div className="col-xs-12 col-sm-12">
                                    <AjaxSearchInput name="s_company" sUrl="/propertyholder/search" filterResult = { data => { return data.propertyholders.map( (item => { return {...item,item_label:item.propertyholder_company} }) ) }  } onItemClick={this.onCompanyTenantItemClick.bind(this)} placeholder="Search existing company"/>
                                </div>

                                <div className="col-xs-12 col-sm-6">
                                    <Input  disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_company" label="Company" value={property_tenant.propertyholder_company}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_contact" label="Contact" value={property_tenant.propertyholder_contact}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_title" label="Title" value={property_tenant.propertyholder_title}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_phone" label="Phone" value={property_tenant.propertyholder_phone}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_website" label="Website" value={property_tenant.propertyholder_website}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_email" label="Email" value={property_tenant.propertyholder_email}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_address_line_1" label="Address Line 1" value={property_tenant.propertyholder_address_line_1}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_address_line_2" label="Address Line 2" value={property_tenant.propertyholder_address_line_2}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_city" label="City" value={property_tenant.propertyholder_city}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_state" label="State" value={property_tenant.propertyholder_state}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_country" label="Country" value={property_tenant.propertyholder_country}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input disable={property_tenant.propertyholder_id} className="disable_with_border" onChange={this.propertyTenantChangeHandler.bind(this)}  name="propertyholder_zip_code" label="Zip Code" value={property_tenant.propertyholder_zip_code}/>
                                </div>

                            </div>
                        </BorderBox>
                        <BrockerForm onReady = { this.onBrokerFormReady.bind(this)}/>
                    </div>
                </div>
                <div className="mt-3"></div>

                {this.state.isCreatingProperty ? <Loading/> : <Button onClick={ this.onPropertyCreateHanlder.bind(this)} label="+ Create Property"/> }
            </div>
        );
    }
}
 
export default CreatePropertyForm;