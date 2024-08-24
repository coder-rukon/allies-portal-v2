"use client"
import { Component } from "react";
import Input from "../forms/Input";
import AjaxSearchInput from "../forms/AjaxSearchInput";
import BorderBox from "../widget/borderbox";
import FileUploader from "../widget/FileUploader";
import Dropdown from "../forms/Dropdown";
import InputRadio from "../forms/inputradio";
import Settings from "@/inc/Settings";
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
import TypeSubtypeDropdown from './typesubtype/TypeSubtypeDropdown';
import Contacts from "../contacts/contacts";
import PropertyHolders from '@/components/property/propertyholder/PropertyHolders'
class CreatePropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingProperty:false,
            property:{
                property_status:'active',
                property_additional_size_unit:'sf',
                property_size_unit:'sf',
                property_type:'industrial'
            },
            broker_contacts:[],
            state:{},
            successMessage: null,
            errorMessage:null,
            redirectTo:null,
        }
        this.fileUploader = null;
        this.addressComponent = null;
        this.propertyOwnerCmp = null;
        this.propertyTenantCmp = null;
        this.additionalFieldsObj = null;
        this.typeSubtypeComponentObj = null;
        this.brokerObj = null;
    }
    componentDidMount(){
        this.props.setOptions({title:'Create Property'})
    }
    onBrokerFormReady(brokerObject){
        this.brokerObj = brokerObject;
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
        let typesSubtypeList = this.typeSubtypeComponentObj.getData();
        let data = {
            ...this.state.property,
            type_subtypes:typesSubtypeList,
            address_line_1: address?.address_line_1,
            address_line_2: address?.address_line_2,
            city: address?.address_city,
            state: address?.address_state,
            country: address?.address_country,
            zipcode: address?.address_zipcode,
            broker_contacts:this.brokerObj ? this.brokerObj.getContacts() : [],
        };
        let addtionalFieldData = {};
        if(  this.additionalFieldsObj ){
            addtionalFieldData = this.additionalFieldsObj.getData();
            data.property_additional_type = this.additionalFieldsObj.state.activeAdditionalType;
        }

        data = {
            ...data,
            ...addtionalFieldData,
        }
        if(this.propertyOwnerCmp){
            let propertyOnerData = this.propertyOwnerCmp.getData();
            data = {
                ...data,
                property_owner:propertyOnerData[0]
            }
        }
        if(this.propertyTenantCmp){
            data = {
                ...data,
                property_tenant:this.propertyTenantCmp.getData()
            }
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

    render() { 
        let property = this.state.property;
        let listing_status_options = Settings.listingStatus;
        if(this.state.redirectTo){
            redirect(this.state.redirectTo)
        }
        let brokerLabels = {
            contact_name: 'Company',
            contact_title: 'Contact',
            contact_email: 'Email',
            contact_phone: 'Phone'
        }        
        return(
            <div className="property_create_form">

                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Property Details">
                            <TypeSubtypeDropdown label={'Property Type/Subtype *'} onReady={ tsDropdown => this.typeSubtypeComponentObj = tsDropdown }/>
                            
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
                        <BorderBox title="Notes">
                            <Input name="property_note" value={property.property_note} onChange={this.onPropertyChangeHanlder.bind(this)}  type="textarea"/>
                        </BorderBox>
                        <BorderBox title="Files">
                            <FileUploader onReady = { obj => { this.fileUploader = obj } } id="upload_files" exportable={true}/>
                        </BorderBox>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Property Owner">
                            <PropertyHolders onReady={ componentObj => { this.propertyOwnerCmp = componentObj}}/>
                        </BorderBox>
                        <BorderBox title="Property Tenant">
                            <PropertyHolders multiple={property.property_tenancy == '2' ? true : false} onReady={ componentObj => { this.propertyTenantCmp = componentObj}}/>
                        </BorderBox>
                        {
                            /**
                             * <PropertyHolder title="Property Owner" onReady={ componentObj => { this.propertyOwnerCmp = componentObj}}/>
                        <PropertyHolder title="Property Tenant" onReady={ componentObj => { this.propertyTenantCmp = componentObj}}/>
                             */
                        }
                        
                        <BorderBox title="Broker Contact">
                            <Contacts adv_btn={true} btnLabel="Add New Contact" onReady = { this.onBrokerFormReady.bind(this)}  hidePrimary={true}  labels = {brokerLabels}/>
                        </BorderBox>
                        
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