import { Component } from "react";
import Input from "../../forms/Input";
import AjaxSearchInput from "../../forms/AjaxSearchInput";
import BorderBox from "../../widget/borderbox";
import FileUploader from "../../widget/FileUploader";
import Dropdown from "../../forms/Dropdown";
import InputRadio from "../../forms/inputradio";
import Settings from "@/inc/Settings";
import BrockerForm from './../new/BrockerForm';
import Api from "@/inc/Api";
import Button from "../../forms/button";
import Loading from "../../widget/Loading";
import Address from '@/components/address/Address';
import PropertyType from '@/components/property/PropertyType';
import Notes from "@/components/notes/Notes";
import Contacts from "@/components/contacts/contacts";
import PropertyCompany from "../company/PropertyCompany";
class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:[],
            isSaving:false,
            property: null,
            isEditing:false,
        }
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
        this.propertyTypeCmp = null;
    }
    
    componentDidMount(){
        this.setState({
            property: this.props.property
        })
    }
    onPropertyTypeComponentReady(componentObj){
        this.propertyTypeCmp = componentObj;
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
    onPropertyChangeHanlder(event){
        let property = this.state.property;
        this.setState({
            property:{
                ...property,
                [event.target.name]:event.target.value
            }
        })
    }
    onAddressChangeHandler(event){
        let address = this.state.property && this.state.property.address ? this.state.property.address : {};
        let property = this.state.property;
    }
    onEditIconClick(event){
        this.setState({
            isEditing:true
        })
    }
    onSaveClick(event){
        this.setState({
            isSaving:true,
            isEditing:false
        })
        let address = this.addressComponent.getAddress();
        let data = {
            ...this.state.property,
            ...this.propertyTypeCmp.getPropertyFields(),
            address_line_1: address?.address_line_1,
            address_line_2: address?.address_line_2,
            city: address?.address_city,
            state: address?.address_state,
            country: address?.address_country,
            zipcode: address?.address_zipcode,
            broker_contacts:this.state.brokerObj ? this.state.brokerObj.getBrokers() : [],
            property_owner_details:null,
            property_tenant_details:null
        };
        let propertyOwner =  this.propertyOwnerCmp.getData();
        if(propertyOwner.address_changed || propertyOwner.compay_changed){
            data.property_owner_details  = propertyOwner;
        }
        let propertyTenant =  this.propertyTenantCmp.getData();
        if(propertyTenant.address_changed || propertyTenant.compay_changed){
            data.property_tenant_details  = propertyTenant;
        }
        let api = Api, that = this;
        if(api.setUserToken()){
            api.axios().post('/property/update',data).then(res=> {
                that.setState({
                    isSaving:false
                })
                console.log(res.data)
                
            }).catch(errors => {
                that.setState({
                    isSaving:false
                })
            })
        }
    }
    render() {
        let property = this.state.property;
        let isDisable = !this.state.isEditing;
        if(!property){
            return <Loading/>
        }
        let propertyAddress = property.address ? property.address : {}
        let listing_type_options = Settings.listingType;
        let listing_status_options = Settings.listingStatus;
        let brokerLabels = {
            contact_name: 'Company',
            contact_title: 'Contact',
            contact_email: 'Email',
            contact_phone: 'Phone'
        }
        return (
            <div className="edit_property_form">
                <div className="pannel_header">
                        <div></div>
                        <div>
                            {

                                this.state.isSaving ? <Loading/> :                                
                                    ( isDisable ? 
                                    <Button onClick={ this.onEditIconClick.bind(this) } className="md" beforeIcon="border_color" label= {"Edit"}/>
                                    :<Button onClick={ this.onSaveClick.bind(this) }  className="md" beforeIcon="save" label= {"Save"}/> )
                                

                            }
                        </div>
                    </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <BorderBox className="input_box_margin_fix" title="Property Details">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown disable={isDisable} name="property_listing_type" options={listing_type_options} errors={this.state.errors}  value={property.property_listing_type} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Listing Type*" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  disable={isDisable} name="property_status" options={listing_status_options} errors={this.state.errors}  value={property.property_status} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Status*" />
                                </div> 
                                <div className="col-xs-12">
                                    <Address  disable={isDisable} source="property" integrator={property.property_id} onReady={ obj => {this.addressComponent = obj }}/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox className="input_box_margin_fix">
                            <PropertyType  disable={isDisable} property={property} onReady = { compObj => { this.onPropertyTypeComponentReady(compObj)} }/>
                        </BorderBox>
                        <BorderBox title="Notes" className="input_box_margin_fix">
                            {property.property_id ? <Notes  disable={isDisable} source="property" integrator={property.property_id}/> : '' } 
                        </BorderBox>
                        <BorderBox title="Files" className="input_box_margin_fix">
                            <FileUploader source="property" integrator={property.property_id} disable={isDisable} id="upload_files"/>
                        </BorderBox>
                    </div>
                    <div className="col-xs-12 col-md-6 input_box_margin_fix">
                        <PropertyCompany onReady={obj => {this.propertyOwnerCmp = obj }} disable={isDisable}  source="owner" title="Property Owner"  company_id = {property.property_owner}/>
                        <div></div>
                        <PropertyCompany  onReady={obj => {this.propertyTenantCmp = obj }} disable={isDisable}  source="tenant" title="Property Tenant"  company_id = {property.property_tenant}/>
                        <BorderBox title="Broker Contact">
                            {property.property_id ? <Contacts  hidePrimary={true} disable={isDisable} source="property_broker" integrator={property.property_id} labels = {brokerLabels}/> : '' } 
                        </BorderBox>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default EditProperty;