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
            activeAdditionalType:'industrial',
            allSubtypes:[]
        }
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
        this.propertyTypeCmp = null;
        this.additionalFieldsObj = new AdditionalFields({});
    }
    
    componentDidMount(){
        this.setState({
            property: this.props.property
        })
        this.additionalFieldsObj = new AdditionalFields(this.props.property);
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
                
                if(res.data.type){
                    that.setState({
                        isSaving:false,
                        error:null
                    })
                }else{
                    that.setState({
                        isSaving:false,
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
    getTypeSubtypeBox(){
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
            {!this.state.isSelectedSubtype ? <Button className="mt-3" label="Continue" onClick={ e => { this.propertyTypeSubtypeOnClick() } } /> : '' }
            </>
        )
    }
    render() {
        let property = this.state.property;
        let errors = this.state.errors;
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
        let propertyTypeSubtype = this.state.propertyTypeSubtype;
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
                { this.state.error ? <ErrorMessage error={this.state.error} /> : '' }
                <div className="property_tst_details">
                    <div className="ptsd_label">Property Type/Subtype</div>
                    <div className="ptsd_selected_label_ctl">
                        <div className="ptsd_selected_label"><strong>{propertyTypeSubtype.type ? propertyTypeSubtype?.type?.label : "Other"} </strong>- {propertyTypeSubtype?.subtype?.subtype_name}</div>
                        <div>
                            <img onClick={ e => { this.setState({isExpandTypeSubtype: !this.state.isExpandTypeSubtype}) }} src={this.state.isExpandTypeSubtype ? "/images/icons/minus.svg" : "/images/icons/plus.svg"} />
                        </div>
                    </div>
                    {
                        this.state.isExpandTypeSubtype ? this.getTypeSubtypeBox() : ''
                    }
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
                        <BorderBox title="Additional Property Details">
                            <div className="property_accordian">
                                {
                                    this.additionalFieldsObj.getAdditionalType().map( (propertyAdditionalType,key) => {
                                        let isActiveType = this.state.activeAdditionalType == propertyAdditionalType.slug ? true : false;
                                        return(
                                            <div className="property_accordian_item" key={key}>
                                                <div className="pa_header" onClick={ e => { this.setState({activeAdditionalType:propertyAdditionalType.slug})}}>
                                                    <div>{propertyAdditionalType.name}</div>
                                                    <div>
                                                        <img src={isActiveType ? "/images/icons/minus.svg" :  "/images/icons/plus.svg"} />
                                                    </div>
                                                    
                                                </div>
                                                {
                                                    isActiveType? <div className="pa_contents"> {this.additionalFieldsObj.displayAditionalFields(propertyAdditionalType.slug)} </div> : ''
                                                }
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
                            {property.property_id ? <Contacts btnLabel="+ Add contact"  hidePrimary={true} disable={isDisable} source="property_broker" integrator={property.property_id} labels = {brokerLabels}/> : '' } 
                        </BorderBox>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default EditProperty;