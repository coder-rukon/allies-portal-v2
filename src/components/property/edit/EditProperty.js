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
import PropertyHolder from './../propertyholder/PropertyHolder';
import Address from '@/components/address/Address';
import PropertyType from '@/components/property/PropertyType';
import Notes from "@/components/notes/Notes";
import Contacts from "@/components/contacts/contacts";
class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:[],
            property: null,
            isEditing:false,
        }
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
        let data = {
            ...this.state.property,
            ...this.propertyTypeCmp.getPropertyFields()
        }
        console.log(data);
    }
    render() {
        let property = this.state.property;
        let editMode = this.state.isEditing;
        if(!property){
            return <Loading/>
        }
        let propertyAddress = property.address ? property.address : {}
        let listing_type_options = Settings.listingType;
        let listing_status_options = Settings.listingStatus;
        let isDisable = false;
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
                                editMode ? 
                                <Button onClick={ this.onSaveClick.bind(this) }  className="md" beforeIcon="save" label= {"Save"}/>
                                :
                                <Button onClick={ this.onEditIconClick.bind(this) } className="md" beforeIcon="border_color" label= {"Edit"}/>

                            }
                        </div>
                    </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <BorderBox title="Property Details">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="property_listing_type" options={listing_type_options} errors={this.state.errors}  value={property.property_listing_type} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Listing Type*" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="property_status" options={listing_status_options} errors={this.state.errors}  value={property.property_status} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Status*" />
                                </div> 
                                <div className="col-xs-12">
                                    <Address source="property" integrator={property.property_id}/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox>
                            <PropertyType property={property} onReady = { compObj => { this.onPropertyTypeComponentReady(compObj)} }/>
                        </BorderBox>
                        <BorderBox title="Notes">
                            {property.property_id ? <Notes source="property" integrator={property.property_id}/> : '' } 
                        </BorderBox>
                        <BorderBox title="Files">
                            <FileUploader id="upload_files"/>
                        </BorderBox>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <PropertyHolder title="Property Owner" onReady={ componentObj => { this.propertyOwnerCmp = componentObj}}/>
                        <PropertyHolder title="Property Tenant" onReady={ componentObj => { this.propertyTenantCmp = componentObj}}/>
                        <BorderBox title="Broker Contact">
                            {property.property_id ? <Contacts hidePrimary={true} disable={isDisable} source="property_broker" integrator={property.property_id} labels = {brokerLabels}/> : '' } 
                        </BorderBox>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default EditProperty;