"use client"
import Panel from "@/components/widget/panel";
import BorderBox from "@/components/widget/borderbox";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/button";
import Contacts from "@/components/contacts/contacts";
import Dropdown from "@/components/forms/Dropdown";
import Notes from "@/components/notes/Notes";
import { Component } from "react";
import Api from "@/inc/Api";
import Loading from "@/components/widget/Loading";
import Settings from "@/inc/Settings";
import Meta from '@/inc/Meta';
import CompanyTeamAccess from '@/components/company/teamaccess/CompanyTeamAccess';
import LinkedProperty from '@/components/company/LinkedProperty';
import Address from "@/components/address/Address";
import CompanyDeals from "@/components/company/deals/CompanyDeals";
import Helper from "@/inc/Helper";
import { connect } from "react-redux";
import CompanySecurityRoles from '@/inc/CompanySecurityRoles';
import FollowUpReminder from '@/components/FollowUpReminder/FollowUpReminder';
import ActivityList from "@/components/activity/ActivityList";
import ConfirmPopup from "@/components/widget/ConfirmPopup";
import { redirect } from 'next/navigation';
import FooterSticky from "@/components/widget/FooterSticky";
import ShareAccessBtn from "@/components/ShareAccess/ShareAccessBtn";
class CompanyDetails  extends Component{
    constructor(props){
        super(props);
        this.state = {
            editMode:false,
            company:{},
            errors:{},
            isLoading:false,
            isSubindustryLoading:false,
            industryList:[],
            subindustryList:[],
            errorMessage:null,
            showDeletePopup:false,
            isDeleting:false,
            redirectTo:null,
        }
        this.addressComponent = null;
        this.contactComponent = null;
        this.teamAccessComponent = null;
    }
    componentDidMount(){
        let companyId = this.props.company_id;
        this.loadCompany(companyId);
        this.loadIndustry();
    }
    onContactComponentReady(ctComponent){
        this.contactComponent = ctComponent;
    }
    loadIndustry(){
        let api = Api, that = this;
        api.setUserToken();
        api.axios().get('/industry?group=yes').then(res=>{
            that.setState({
                industryList:res.data.data
            })
        })
    }    
    loadSubindustry(industry_id){
        if(!industry_id){
            return;
        }
        let api = Api, that = this;
        api.setUserToken();
        this.setState({
            isSubindustryLoading:true,
            subindustryList:[]
        })
        api.axios().get('/subindustry/get-by-industry/'+industry_id).then(res=>{
            that.setState({
                isSubindustryLoading:false,
                subindustryList:res.data.data
            })
        })
    }
    loadCompany(companyId){
        let api = Api;
        if(api.setUserToken()){
            this.setState({
                isLoading:true,
                company:{}
            })
            let that = this;
            api.axios().get('/company/get/'+companyId).then(res=>{
                if(res.data.type){
                    let companyObj = res.data.data.company;
                    that.setState({
                        isLoading:false,
                        company:companyObj
                    })
                    that.loadSubindustry( companyObj.industry )
                }else{
                    alert(res.data.message)
                }
                
            }).catch(error =>{
               
            })
        }
    }
    onCompanyChangeHandler(event){
        let company = this.state.company;
        company[event.target.name] = event.target.value;
        this.setState({
            errors:{
                ...this.state.errors,
                [event.target.name]:null
            },
            company:company
        })
        if(event.target.name == 'industry'){
            this.loadSubindustry(event.target.value);
        }
    }
    onSaveClick(){
        let contacts = this.contactComponent.getContacts();
        /*
        let isErrorFound = false;
        contacts.forEach(contact => {
            if( !Helper.getNullableValue(contact.contact_name)){
                isErrorFound = true;
            }
            if( !Helper.getNullableValue(contact.contact_title)){
                isErrorFound = true;

            }
        });
        if(isErrorFound){
            return;
        }
        */

        this.setState({
            isLoading:true
        })
        
        let api = Api, that = this;
        let address = this.addressComponent.getAddress();
        
        let company = {
            ...this.state.company,
            ...address,
            company_contacts:contacts
        }
        

        if(api.setUserToken()){
            api.axios().post('/company/update/'+company.company_id,company).then(res=>{
                if(res.data.type){
                    that.setState({
                        editMode:false,
                        company:res.data.data.company,
                        isLoading:false
                    })
                }else{
                    that.setState({
                        isLoading:false,
                        errors:res.data.errors
                    })
                }
            }).catch(error => {
                
            })
        }
    }
    onEditIconClick(){
        this.setState({
            editMode:true
        })
    }
    getIndustryGroupLabel(group_id){
        let groups = Settings.industryGroups;
        let groupLabel = '';
        groups.forEach(groupItem => {
            if(groupItem.value == group_id){
                groupLabel = groupItem.label;
            }
        })
        return groupLabel;
    }
    getIndustryDropdownOptions(){
        let options = [];
        let industryList = this.state.industryList;
        Object.keys(industryList).forEach(objectKy => {
            let industryTemp = industryList[objectKy];
            options.push({
                ...industryTemp,
                label: this.getIndustryGroupLabel(industryTemp.industry_group),
                value: ''
            })
        });
        return options;
    }
    canDeleteCompany(){
        //let isDisable = !this.state.editMode;
        let srObj = new CompanySecurityRoles(this.props.companyAccess);
        let company = this.state.company;
        if(!srObj.canEditCompany(company.company_id)){
            return false;
        }
        return true;
    }
    onDeleteHanlder(){
        
        let company = this.state.company;
        this.setState({
            isDeleting:true
        })
        let api = Api, that = this;
        if(api.setUserToken()){
            api.axios().post('/company/delete',{company_id:company.company_id}).then(res => {
                if(!res.data.type){
                    Helper.alert(res.data.message,{
                        className:'error'
                    })
                    that.setState({
                        isDeleting:false,
                        redirectTo:null,
                        showDeletePopup:false
                    }) 
                }else{
                    Helper.alert(res.data.message,{
                        className:'success'
                    })
                    that.setState({
                        isDeleting:false,
                        redirectTo:'/company',
                        showDeletePopup:false
                    }) 
                }
               
            })
        }
    }    
    onDeleteClickHanlder(){
        
        this.setState({
            showDeletePopup:true
        })
    }
    render() {
        if(this.state.redirectTo){
            redirect(this.state.redirectTo)
        }
        let isDisable = !this.state.editMode;
        let editMode = this.state.editMode;
        if(this.state.isLoading){
            return <Panel className="text-center"><Loading/></Panel>
        }
        let company = this.state.company;
        let industry_options = this.getIndustryDropdownOptions();
        let sub_industry_options = this.state.subindustryList.map( item => { return {label:item.subindustry_name, value: item.subindustry_id}});
        let lead_capture_type_otpions = Settings.getCompanySource();
        let srObj = new CompanySecurityRoles(this.props.companyAccess)
        return(
            <Panel className=" input_box_margin_fix">
                    <Meta title={company?.name}/>
                    {
                        this.state.showDeletePopup ? <ConfirmPopup isLoading={this.state.isDeleting} onYes={this.onDeleteHanlder.bind(this)} confirm_title={this.state.isDeleting ? 'Deleting the company. Please wait.' : "Do you want to delete?"} onClose={ () => { this.setState({showDeletePopup:false})} }/>: ''
                    }
                    <div className="pannel_header">
                        <div></div>
                        <div className="d-flex gap-2">
                            {
                                editMode ? 
                                <Button onClick={ this.onSaveClick.bind(this) }  className="md" beforeIcon="save" label= {"Save"}/>
                                :
                                <Button disable={!srObj.canEditCompany(company.company_id)} onClick={ this.onEditIconClick.bind(this) } className="md" beforeIcon="border_color" label= {"Edit"}/>

                            }
                            
                            <Button className="md" onClick={this.onDeleteClickHanlder.bind(this)} beforeIcon="delete" label="Delete company" disable={!this.canDeleteCompany()} />
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <BorderBox title="Details">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable}  onChange={this.onCompanyChangeHandler.bind(this)}  name="name" label="Company Name *" value={company.name}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable}  onChange={this.onCompanyChangeHandler.bind(this)} name="website" label="Website" value={company.website}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Dropdown disable={isDisable}  name="industry" options={industry_options} errors={this.state.errors}  value={company.industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Industry" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Dropdown disable={isDisable} name="sub_industry" options={sub_industry_options} errors={this.state.errors}  value={company.sub_industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Sub-Industry" />
                                        { this.state.isSubindustryLoading ? <Loading/> : ''}
                                    </div>
                                </div>
                                
                            </BorderBox>
                            <BorderBox title="Contacts">
                                {company.company_id ? <Contacts blank_form={true} onReady={this.onContactComponentReady.bind(this)} disable={isDisable} source="company" integrator={company.company_id}/> : '' } 
                            </BorderBox>
                            <BorderBox title="Address">
                                <Address  disable={isDisable} source="company" integrator={company.company_id} onReady={ obj => {this.addressComponent = obj }}/>
                            </BorderBox>
                            <BorderBox title="Notes">
                               {company.company_id ? <Notes  disable={isDisable} source="company" integrator={company.company_id}/> : '' } 
                            </BorderBox>
                            <div className="mt-3"></div>
                            
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            {company.company_id ? <ActivityList disable={isDisable} integrator={company.company_id} source="company"/> : '' }
                            <BorderBox title="Current Deals">
                                <CompanyDeals disable={isDisable} />
                                
                            </BorderBox>
                            <BorderBox title="Previous Deals">
                                <div className="current_deals_demo">
                                    <p>No Previous Deals</p>
                                </div>
                            </BorderBox>
                            <BorderBox title="Linked Properties">
                                <LinkedProperty  disable={isDisable} company={company} />
                            </BorderBox>
                            <BorderBox title="Lead Capture">
                                <div className="new_company_lead_type">
                                <Dropdown name="lead_capture_type"  disable={isDisable} options={lead_capture_type_otpions} errors={this.state.errors}  value={company.lead_capture_type} onChange={this.onCompanyChangeHandler.bind(this)} label="Lead Type" />
                                </div>
                            </BorderBox>
                        </div>
                    </div>
                    <FooterSticky>
                        <div className="">{this.state.isLoading ? <Loading/> : ''}</div>
                        <div className="d-flex justify-content-between gap-3">
                            <div>
                                <ShareAccessBtn disable={isDisable} onReady={ obj => { this.teamAccessComponent = obj }} integrator={company.company_id} source="company"/>
                            </div>
                            <div>
                                {editMode ? <Button label="Save Company" disable={isDisable} onClick={ this.onSaveClick.bind(this) } /> : <Button disable={!srObj.canEditCompany(company.company_id)} onClick={ this.onEditIconClick.bind(this) }  beforeIcon="border_color" label= {"Edit"}/> }
                            </div>

                        </div>
                    </FooterSticky>
                    
                </Panel>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        companyAccess: state.companyAccess
    }
};
export default connect(mapStateToProps) (CompanyDetails);