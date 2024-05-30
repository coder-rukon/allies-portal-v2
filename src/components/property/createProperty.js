"use client"
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
import AlertMessage from "../widget/AlertMessage";
import PropertyHolder from './propertyholder/PropertyHolder';
import { redirect } from 'next/navigation';
import Address from "../address/Address";
import { connect } from "react-redux";
import ActionsTypes from "@/inc/ActionTypes";
class CreatePropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingProperty:false,
            property:{
                property_type:'industrial'
            },
            brokerObj:null,
            broker_contacts:[],
            state:{},
            successMessage: null,
            errorMessage:null,
            redirectTo:null
        }
        this.fileUploader = null;
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
    }
    componentDidMount(){
        this.props.setOptions({title:'Create Property'})
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
  
   
    onPropertyRentTypeChange(event,value){
        let property = this.state.property;
        this.setState({
           
            property:{
                ...property,
                property_type:event.target.value
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
    onPropertyCreateHanlder(event){

        this.setState({
            isCreatingProperty:true
        })
        let address = this.addressComponent.getAddress();
        let data = {
            ...this.state.property,
            address_line_1: address?.address_line_1,
            address_line_2: address?.address_line_2,
            city: address?.address_city,
            state: address?.address_state,
            country: address?.address_country,
            zipcode: address?.address_zipcode,
            broker_contacts:this.state.brokerObj ? this.state.brokerObj.getBrokers() : [],
        };
        let propertyOwner =  this.propertyOwnerCmp.getData();
        data = {
            ...data,
            property_owner_id:propertyOwner?.propertyholder_id,
            property_owner_company:propertyOwner?.propertyholder_company,
            property_owner_contact:propertyOwner?.propertyholder_contact,
            property_owner_title:propertyOwner?.propertyholder_title,
            property_owner_phone:propertyOwner?.propertyholder_phone,
            property_owner_website:propertyOwner?.propertyholder_website,
            property_owner_email:propertyOwner?.propertyholder_email,
            property_owner_address_line_1:propertyOwner?.propertyholder_address_line_1,
            property_owner_address_line_2:propertyOwner?.propertyholder_address_line_2,
            property_owner_city:propertyOwner?.propertyholder_city,
            property_owner_state:propertyOwner?.propertyholder_state,
            property_owner_country:propertyOwner?.propertyholder_country,
            property_owner_zipcode:propertyOwner?.propertyholder_zipcode,
        }
        let propertyTenent =  this.propertyTenantCmp.getData();
        data = {
            ...data,
            property_tenant_id:propertyTenent?.propertyholder_id,
            property_tenant_company:propertyTenent?.propertyholder_company,
            property_tenant_contact:propertyTenent?.propertyholder_contact,
            property_tenant_title:propertyTenent?.propertyholder_title,
            property_tenant_phone:propertyTenent?.propertyholder_phone,
            property_tenant_website:propertyTenent?.propertyholder_website,
            property_tenant_email:propertyTenent?.propertyholder_email,
            property_tenant_address_line_1:propertyTenent?.propertyholder_address_line_1,
            property_tenant_address_line_2:propertyTenent?.propertyholder_address_line_2,
            property_tenant_city:propertyTenent?.propertyholder_city,
            property_tenant_state:propertyTenent?.propertyholder_state,
            property_tenant_country:propertyTenent?.propertyholder_country,
            property_tenant_zipcode:propertyTenent?.propertyholder_zipcode,
        }
        let api = Api, that = this;
        if(api.setUserToken()){
            api.axios().post('/property/create',data).then(res=> {
                
                if(res.data.type){
                    if(that.fileUploader.hasExportableFile()){
                        that.fileUploader.uploadExportableFiles('property',res.data.data.property_id,() => {
                            that.setState({
                                redirectTo:'/property/edit/'+res.data.data.property_id,
                                successMessage: res.data.message,
                                errorMessage:null,
                                isCreatingProperty:false
                            })
                        });
                    }else{
                        that.setState({
                            redirectTo:'/property/edit/'+res.data.data.property_id,
                            successMessage: res.data.message,
                            errorMessage:null,
                            isCreatingProperty:false
                        })
                        
                    }
                }else{
                    that.setState({
                        isCreatingProperty:false,
                        errorMessage: res.data.message
                    })
                }
                
            }).catch(errors => {
                that.setState({
                    isCreatingProperty:false
                })
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
        let listing_type_options = Settings.listingType;
        let listing_status_options = Settings.listingStatus;
        if(this.state.redirectTo){
            redirect(this.state.redirectTo)
        }
        return(
            <div className="property_create_form">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Property Details">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="property_listing_type" options={listing_type_options} errors={this.state.errors}  value={property.property_listing_type} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Listing Type*" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="property_status" options={listing_status_options} errors={this.state.errors}  value={property.property_status} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Status*" />
                                </div> 
                                <div className="col-xs-12">
                                    <Address source="property" exportable={true} onReady={ obj => {this.addressComponent = obj }}/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox>
                            <div className="d-flex property_category_nav">
                                <div><InputRadio checked={ property.property_type == 'industrial' ? true : false } onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="industrial" title="Industrial"/></div>
                                <div><InputRadio checked={property.property_type == 'office' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="office" title="Office"/></div>
                                <div><InputRadio checked={property.property_type == 'retail' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="retail" title="Retail"/></div>
                                <div><InputRadio checked={property.property_type == 'land' ? true : false}  onChange={this.onPropertyRentTypeChange.bind(this)}  name="property_type" value="land" title="land"/></div>
                            </div>
                            { property.property_type =='industrial' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_type =='office' ? <div className="row">{['property_size','property_acres','property_zoning', 'property_private_offices','property_bathrooms','property_parking_ratio','property_suites','property_class','property_min_space','property_max_contiguous_space','property_year_built','property_year_renovated','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_type =='retail' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                            { property.property_type =='land' ? <div className="row">{['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'].map( item => { return this.getSpaceFields(item) })}</div> : '' }
                        </BorderBox>
                        <BorderBox title="Note">
                            <Input name="property_note" value={property.property_note} onChange={this.onPropertyChangeHanlder.bind(this)}  type="textarea"/>
                        </BorderBox>
                        <BorderBox title="Files">
                            <FileUploader onReady = { obj => { this.fileUploader = obj } } id="upload_files" exportable={true}/>
                        </BorderBox>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <PropertyHolder title="Property Owner" onReady={ componentObj => { this.propertyOwnerCmp = componentObj}}/>
                        <PropertyHolder title="Property Tenant" onReady={ componentObj => { this.propertyTenantCmp = componentObj}}/>
                        <BrockerForm onReady = { this.onBrokerFormReady.bind(this)}/>
                    </div>
                </div>
                <div className="mt-3"></div>
                <AlertMessage message={this.state.errorMessage} type="text-danger"/>
                <AlertMessage message={this.state.successMessage}/>
                {this.state.isCreatingProperty ? <Loading/> : <Button onClick={ this.onPropertyCreateHanlder.bind(this)} label="+ Create Property"/> }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});
 
export default connect(mapStateToProps,mapDispatchToProps) (CreatePropertyForm);