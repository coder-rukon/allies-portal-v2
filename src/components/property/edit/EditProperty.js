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
import ErrorMessage from "@/components/widget/errormessage";
import AdditionalFields from '@/components/property/AdditionalFields';
import Helper from "@/inc/Helper";
import { connect } from "react-redux";
import CompanySecurityRoles from "@/inc/CompanySecurityRoles";
class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:[],
            error:null,
            isSaving:false,
            property: null,
            isEditing:false,
            isExpandTypeSubtype:false,
            isSelectedSubtype:false,
            propertyTypeSubtype:{},
            allSubtypes:[]
        }
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
        this.propertyTypeCmp = null;
        this.additionalFieldsObj = null;
        this.brokerContactComponent = null;
    }
    
    componentDidMount(){
        let property = this.props.property;
        this.setState({
            property: property,
        })
        this.loadSubtypes()
    }
    setTypeSubtypeFormProperty(){
        let property = this.state.property;
        let subtype_id = property.property_subtype;
        
        if(subtype_id){
            let subtype = res.data.data.find(item => { return subtype_id == item.subtype_id })
            this.setState({
                propertyTypeSubtype:{
                    type:subtype ? Helper.getPropertyType(subtype.property_type_id) : null,
                    subtype:  subtype
                }
            })
        }else{
            this.setState({
                propertyTypeSubtype:{
                    type:null,
                    subtype:  {subtype_name: property.property_subtype_name}
                }
            })
        }
    }
    loadSubtypes(){
        let api = Api, that = this;
        that.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get('/property-subtype').then(res => {
            that.setState({
                isLoading:false,
                allSubtypes:res.data.data
            }, () =>{
                that.setTypeSubtypeFormProperty()
            })
            
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
        })
        let address = this.addressComponent.getAddress();
        let brokerContacts = this.brokerContactComponent.getContacts();

        
        let propertyTypeSubtype = this.state.propertyTypeSubtype;
        let addtionalFieldData = {};
        
        let data = {
            ...this.state.property,
            broker_contacts:brokerContacts,
            property_type : ( propertyTypeSubtype.type &&  propertyTypeSubtype.type.pt_id )? propertyTypeSubtype.type.pt_id  : null ,
            property_subtype : ( propertyTypeSubtype.subtype &&  propertyTypeSubtype.subtype.subtype_id )? propertyTypeSubtype.type.subtype_id  : null ,
            property_subtype_name : ( propertyTypeSubtype.subtype &&  propertyTypeSubtype.subtype.subtype_name ) ? propertyTypeSubtype.subtype.subtype_name : null ,
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
    propertyTypeOtherChangeHandler(event){
        this.setState({
            propertyTypeSubtype:{
                type:null,
                subtype:  {subtype_name:event.target.value}
            }
        })
    }
    onPropertySubTypeChange(event){
        let subtype = this.state.allSubtypes.find(item => { return event.target.value == item.subtype_id })
        document.getElementById('psubtype_other').value = '';
        if(!subtype){
            subtype = null;
        }
        this.setState({
            propertyTypeSubtype:{
                type:subtype ? Helper.getPropertyType(subtype.property_type_id) : null,
                subtype:  subtype
            }
        })
    }
    onBrokerContactComponentReady(ctComponent){
        this.brokerContactComponent = ctComponent;
    }
    getTypeSubtypeBox(){
        if(!this.state.isEditing){
            return;
        }
        if(this.state.isLoading){
            return <Loading/>
        }

        return(
            <>
            <BorderBox title="Property Type/Subtype">
                <div className="p_typesubtype_rows">
                    {
                        Helper.getPropertyType().map( (pType,key) => {
                            let gorupSubtypes = this.state.allSubtypes.filter( typeItem => typeItem.property_type_id == pType.pt_id )
                            return (
                                <div key={key} className={gorupSubtypes.length >= 2 ? "p_group p_group_full" : "p_group"}>
                                    <h4>{pType.label}</h4>
                                    <div className="pgroup_subtypes">
                                    {
                                        gorupSubtypes.map( (subtype , keyInner) => {
                                            return(
                                                <div key={keyInner} className="pgroup_subtype">
                                                    <InputRadio onChange={ this.onPropertySubTypeChange.bind(this)} name="item_subtype" value={subtype.subtype_id} title={subtype.subtype_name}/>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                    
                                </div>
                            )
                        } )
                    }
                    <div className={"p_group"}>
                        <h4>Other</h4>
                        <div className="pgroup_subtypes">
                            <Input name="other" id="psubtype_other" onChange={this.propertyTypeOtherChangeHandler.bind(this)} />
                        </div>
                        
                    </div>
                </div>
                
            </BorderBox>
            </>
        )
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
                            <div className="property_tst_details">
                                <div className="ptsd_label">Property Type/Subtype</div>
                                <div className="ptsd_selected_label_ctl">
                                    <div className="ptsd_selected_label"><strong>{propertyTypeSubtype.type ? propertyTypeSubtype?.type?.label : "Other"} </strong>- {propertyTypeSubtype?.subtype?.subtype_name}</div>
                                    
                                    <div>
                                       { !isDisable ? <img onClick={ e => { this.setState({isExpandTypeSubtype: !this.state.isExpandTypeSubtype}) }} src={this.state.isExpandTypeSubtype ? "/images/icons/minus.svg" : "/images/icons/plus.svg"} /> : ''} 
                                    </div>
                                </div>
                                {
                                    this.state.isExpandTypeSubtype ? this.getTypeSubtypeBox() : ''
                                }
                            </div>
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
                                        options = {
                                            [{ name:'property_size_unit',  disable:isDisable, title:"SF", value:'sf',onChange:this.onPropertyChangeHanlder.bind(this),checked:property.property_size_unit == 'sf' ? true : false },{ name:'property_size_unit', title:"Acre", value:'acre',checked:property.property_size_unit == 'acre' ? true : false,disable:isDisable,onChange:this.onPropertyChangeHanlder.bind(this) }]
                                        }
                                    />
                                </div>   
                                <div className="col-xs-12 col-sm-6">
                                    <Input  
                                        name="property_additional_size"
                                         disable={isDisable} 
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
                        <BorderBox title="Additional Property Details">
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
                            {property.property_id ? <Contacts btnLabel="+ Add contact" onReady={this.onBrokerContactComponentReady.bind(this)} hidePrimary={true} disable={isDisable} source="property_broker" integrator={property.property_id} labels = {brokerLabels}/> : '' } 
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