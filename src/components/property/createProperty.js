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
import Helper from "@/inc/Helper";
import Checkbox from "../forms/checkbox";
import AdditionalFields from '@/components/property/AdditionalFields';
class CreatePropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingProperty:false,
            property:{
                property_additional_size_unit:'sf',
                property_size_unit:'sf',
                property_type:'industrial'
            },
            brokerObj:null,
            broker_contacts:[],
            state:{},
            successMessage: null,
            errorMessage:null,
            redirectTo:null,
            isExpandTypeSubtype:false,
            isSelectedSubtype:false,
            propertyTypeSubtype:{},
            allSubtypes:[]
        }
        this.fileUploader = null;
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
        this.additionalFieldsObj = null;
    }
    componentDidMount(){
        this.props.setOptions({title:'Create Property'})
        this.loadSubtypes();
    }
    onBrokerFormReady(brokerObject){
        this.setState({
            brokerObj: brokerObject
        })
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
        let propertyTypeSubtype = this.state.propertyTypeSubtype;
        let data = {
            ...this.state.property,
            property_type : ( propertyTypeSubtype.type &&  propertyTypeSubtype.type.pt_id )? propertyTypeSubtype.type.pt_id  : null ,
            property_subtype : ( propertyTypeSubtype.subtype &&  propertyTypeSubtype.subtype.subtype_id )? propertyTypeSubtype.type.subtype_id  : null ,
            property_subtype_name : ( propertyTypeSubtype.subtype &&  propertyTypeSubtype.subtype.subtype_name ) ? propertyTypeSubtype.subtype.subtype_name : null ,
            address_line_1: address?.address_line_1,
            address_line_2: address?.address_line_2,
            city: address?.address_city,
            state: address?.address_state,
            country: address?.address_country,
            zipcode: address?.address_zipcode,
            broker_contacts:this.state.brokerObj ? this.state.brokerObj.getBrokers() : [],
        };
        let propertyOwner =  this.propertyOwnerCmp.getData();
        let addtionalFieldData = {};
        if(  this.additionalFieldsObj ){
            addtionalFieldData = this.additionalFieldsObj.getData();
            data.property_additional_type = this.additionalFieldsObj.state.activeAdditionalType;
        }

        data = {
            ...data,
            ...addtionalFieldData,
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
   
    propertyTypeSubtypeOnClick(){
        let typeSubtype = this.state.propertyTypeSubtype;
        if(!typeSubtype.subtype){

            return;
        }
        this.setState({
            isSelectedSubtype:true
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
    propertyTypeOtherChangeHandler(event){
        this.setState({
            propertyTypeSubtype:{
                type:null,
                subtype:  {subtype_name:event.target.value}
            }
        })
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
                                    gorupSubtypes.map( ( subtype , keyInner) => {
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
        let listing_status_options = Settings.listingStatus;
        if(this.state.redirectTo){
            redirect(this.state.redirectTo)
        }
        if(!this.state.isSelectedSubtype){
            return this.getTypeSubtypeBox();
        }
        let propertyTypeSubtype = this.state.propertyTypeSubtype;
        
        return(
            <div className="property_create_form">

                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Property Details">
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
                                
                                <div className="col-xs-12">
                                    <Address source="property" exportable={true} onReady={ obj => {this.addressComponent = obj }}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="property_tenancy" options={Helper.tenancyOptions()} errors={this.state.errors}  value={property.property_tenancy} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Tenancy" />
                                </div>  
                                <div className="col-xs-12 col-sm-6">
                                    <Input  name="property_submarket" errors={this.state.errors}  value={property.property_submarket} onChange={this.onPropertyChangeHanlder.bind(this)} label="Submarket" />
                                </div>   
                                <div className="col-xs-12 col-sm-6">
                                    <Input  name="property_size"
                                        errors={this.state.errors}  
                                        value={property.property_size} 
                                        onChange={this.onPropertyChangeHanlder.bind(this)} 
                                        label="Size" 
                                        options = {
                                            [{ name:'property_size_unit', title:"SF", value:'sf',onChange:this.onPropertyChangeHanlder.bind(this),checked:property.property_size_unit == 'sf' ? true : false },{ name:'property_size_unit', title:"Acre", value:'acre',checked:property.property_size_unit == 'acre' ? true : false,onChange:this.onPropertyChangeHanlder.bind(this) }]
                                        }
                                    />
                                </div>   
                                <div className="col-xs-12 col-sm-6">
                                    <Input  
                                        name="property_additional_size"
                                        options = {
                                            [{ name:'property_additional_size_unit', title:"SF",value:'sf',checked:property.property_additional_size_unit == 'sf' ? true : false,onChange:this.onPropertyChangeHanlder.bind(this) },{ name:'property_additional_size_unit', title:"Acre", value:'acre',onChange:this.onPropertyChangeHanlder.bind(this),checked:property.property_additional_size_unit == 'acre' ? true : false }]
                                        }
                                        errors={this.state.errors}  value={property.property_additional_size } onChange={this.onPropertyChangeHanlder.bind(this)} label="Additional Size (Optional)" />
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input  name="property_zoning" errors={this.state.errors}  value={property.property_zoning } onChange={this.onPropertyChangeHanlder.bind(this)} label="Zoning" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Input  name="property_cross_street" errors={this.state.errors}  value={property.property_cross_street } onChange={this.onPropertyChangeHanlder.bind(this)} label="Cross Street" />
                                </div> 
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown  name="property_status" options={listing_status_options} errors={this.state.errors}  value={property.property_status} onChange={this.onPropertyDropdownChangeHandler.bind(this)} label="Status*" />
                                </div> 
                            </div>
                        </BorderBox>
                        <BorderBox title="Additional Property Details">
                            <AdditionalFields onReady={obj => { this.additionalFieldsObj = obj }}/>
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