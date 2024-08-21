import { Component } from "react";
import Input from "../../forms/Input";
import AjaxSearchInput from "../../forms/AjaxSearchInput";
import BorderBox from "../../widget/borderbox";
import FileUploader from "../../widget/FileUploader";
import Dropdown from "../../forms/Dropdown";
import Settings from "@/inc/Settings";
import Api from "@/inc/Api";
import Button from "../../forms/button";
import Loading from "../../widget/Loading";
import Address from '@/components/address/Address';
import Notes from "@/components/notes/Notes";
import Contacts from "@/components/contacts/contacts";
import PropertyCompany from "../company/PropertyCompany";
import ErrorMessage from "@/components/widget/errormessage";
import AdditionalFields from '@/components/property/AdditionalFields';
import Helper from "@/inc/Helper";
import { connect } from "react-redux";
import CompanySecurityRoles from "@/inc/CompanySecurityRoles";
import TypeSubtypeDropdown from "../typesubtype/TypeSubtypeDropdown";
class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:[],
            error:null,
            isSaving:false,
            property: null,
            isEditing:false
        }
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
        this.additionalFieldsObj = null;
        this.brokerContactComponent = null;
        this.typeSubtypeComponentObj = null;
    }
    
    componentDidMount(){
        let property = this.props.property;
        this.setState({
            property: property,
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
        })
        let address = this.addressComponent.getAddress();
        let brokerContacts = this.brokerContactComponent.getContacts();
        let typesSubtypeList = this.typeSubtypeComponentObj.getData();
        
        let addtionalFieldData = {};
        
        let data = {
            ...this.state.property,
            broker_contacts:brokerContacts,
            type_subtypes:typesSubtypeList,
            ...addtionalFieldData,
            address_line_1: address?.address_line_1,
            address_line_2: address?.address_line_2,
            city: address?.address_city,
            state: address?.address_state,
            country: address?.address_country,
            zipcode: address?.address_zipcode,
            property_owner_details:null,
            property_tenant_details:null
        };
        if(  this.additionalFieldsObj ){
            data = {
                ...data,
                property_additional_type:this.additionalFieldsObj.state.activeAdditionalType,
                ...this.additionalFieldsObj.getData()
            }
        }
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
                
                if(res.data.type){
                    that.setState({
                        isSaving:false,
                        isEditing:false,
                        error:null
                    })
                }else{
                    that.setState({
                        isSaving:false,
                        isEditing:true,
                        error:res.data.message
                    })
                }
                console.log(res.data)
                
            }).catch(errors => {
                that.setState({
                    isSaving:false
                })
            }) 
        }
    }

    onBrokerContactComponentReady(ctComponent){
        this.brokerContactComponent = ctComponent;
    }
    
    canUserEditProperty(){
        let property = this.state.property;
        if(this.props.auth.user.id == property.created_by){
            return true;
        }
        let srObj = new CompanySecurityRoles(this.props.companyAccess)
        if(srObj.canEditCompany(property.property_owner)){
            return true;
        }
        if(srObj.canEditCompany(property.property_tenant)){
            return true;
        }
        return false;
    }
    render() {
        let property = this.state.property;
        let errors = this.state.errors;
        let isDisable = !this.state.isEditing;
        if(!property){
            return <Loading/>
        }
      
        let listing_status_options = Settings.listingStatus;
        let brokerLabels = {
            contact_name: 'Company',
            contact_title: 'Contact',
            contact_email: 'Email',
            contact_phone: 'Phone'
        }
        let propertyTypeSubtype = this.state.propertyTypeSubtype;


        return (
            <div className="edit_property_form">
                <div className="pannel_header">
                    <div></div>
                    <div>
                        {

                            this.state.isSaving ? <Loading/> :                                
                                ( isDisable ? 
                                <Button disable={!this.canUserEditProperty()} onClick={ this.onEditIconClick.bind(this) } className="md" beforeIcon="border_color" label= {"Edit"}/>
                                :<Button onClick={ this.onSaveClick.bind(this) }  className="md" beforeIcon="save" label= {"Save"}/> )
                            

                        }
                    </div>
                </div>
                { this.state.error ? <ErrorMessage error={this.state.error} /> : '' }
                
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <BorderBox className="input_box_margin_fix" title="Property Details">
                            <TypeSubtypeDropdown disable={isDisable} label={'Property Type/Subtype *'} data={property.type_subtypes ? property.type_subtypes : [] } onReady={ tsDropdown => this.typeSubtypeComponentObj = tsDropdown }/>

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
                        </BorderBox>
                        <BorderBox className="input_box_margin_fix" title="Additional Property Details">
                            {property.property_id ? <AdditionalFields disable={isDisable} property={property} onReady={obj => { this.additionalFieldsObj = obj }}/> : <Loading/>}
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
                        
                        <PropertyCompany  onReady={obj => {this.propertyTenantCmp = obj }} disable={isDisable}  source="tenant" title="Property Tenant"  company_id = {property.property_tenant}/>
                        <BorderBox title="Broker Contact">
                            {property.property_id ? <Contacts adv_btn={true} btnLabel="Add New Contact" onReady={this.onBrokerContactComponentReady.bind(this)} hidePrimary={true} disable={isDisable} source="property_broker" integrator={property.property_id} labels = {brokerLabels}/> : '' } 
                        </BorderBox>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        companyAccess: state.companyAccess
    }
};
export default connect(mapStateToProps) ( EditProperty);