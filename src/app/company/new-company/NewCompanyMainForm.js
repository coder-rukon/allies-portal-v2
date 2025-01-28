"use client"
import Panel from "@/components/widget/panel";
import BorderBox from "@/components/widget/borderbox";
import Loading from "@/components/widget/Loading";
import Input from "@/components/forms/Input";
import Dropdown from "@/components/forms/Dropdown";
import Button from "@/components/forms/button";
import Contacts from "@/components/company/new/contacts";
import { Component } from "react";
import Api from "../../../inc/Api";
import { connect } from "react-redux";
import ActionsTypes from "@/inc/ActionTypes";
import { redirect } from 'next/navigation';
import Address from "@/components/address/Address";
import Settings from "@/inc/Settings";
import NewCompanyLinkProperty from '@/components/company/new/property/NewCompanyLinkProperty';
import DisplayErrors from '@/components/widget/DisplayErrors';
import $ from 'jquery';
import NewActivityForm from "@/components/activity/NewActivityForm";
import FooterSticky from "@/components/widget/FooterSticky";
import ShareAccessBtn from "@/components/ShareAccess/ShareAccessBtn";
import Helper from "@/inc/Helper";
class NewCompanyMainForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSaving:false,
            isSubindustryLoading:false,
            redirectTo:null,
            industryList:[],
            subindustryList:[],
            errors:{},
            company: {
                name:''
            }
        }
        this.contactComponent = null;
        this.addressComponent = null;
        this.propertyLinkComponent = null;
        //this.followUpRemainderObj = null;
        this.teamAccessComponent = null;
        this.activyFormObj = null;
    }
    componentDidMount(){
        this.props.setOptions({title:'Create Company'})
        if(this.props.defaultData){
            this.setState({
                company:this.props.defaultData
            })
            if(this.props.defaultData.contacts && this.contactComponent){
                this.contactComponent.setData(this.props.defaultData.contacts);
            }
            if(this.props.defaultData.address && this.addressComponent){
                this.addressComponent.setAddress(this.props.defaultData.address);
            }
            console.log('this.props.defaultData',this.props.defaultData)
        }
        this.loadIndustry();
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
    onCreateButtonClick(){
        if(this.state.isSaving){
            return;
        }
        let teamAccessData = this.teamAccessComponent.getData();
        if(teamAccessData.length >= 1){
            let isError = false;
            teamAccessData.forEach(item => {
                if((!item.role_id)){
                    Helper.alert('Please select role for all team members',{className:'error'});
                    isError = true;
                }
            })
            if(isError){
                this.teamAccessComponent.sidebarObj.showSidebar();
                return;
            }
        }
        let api = Api,that = this;
        //Helper.setCookie('allies_token','7|ed3Ldx7aV8DO85IsdEp7c3mgDnGLafk9tMZ1sBz060b488a1',300)
        if(!api.setUserToken()){
             location.reload();
        }
        let address = this.addressComponent.getAddress();

        let data = {
            ...this.state.company,
            address_line_1: address?.address_line_1,
            address_line_2: address?.address_line_2,
            address_city: address?.address_city,
            address_state: address?.address_state,
            address_country: address?.address_country,
            address_zipcode: address?.address_zipcode,
            contacts: this.contactComponent ? this.contactComponent.getContacts() : null,
            properties:  this.propertyLinkComponent ? this.propertyLinkComponent.getData().map( item => { return {property_id:item.property_id,link_type:item.rs_property_link_type} }) : null,
            team_access: teamAccessData,
            activity_data: this.activyFormObj ? this.activyFormObj.getData() : {}
            //follow_up_reminder: this.followUpRemainderObj.getData(),
        }
        that.setState({
            isSaving:true
        })
        api.axios().post('/company/create',data).then(res=>{
            if(res.data.type){
                $(document).trigger('security_reload');
                that.setState({
                    isSaving:false,
                    redirectTo: '/company/details/' + res.data.data.company_id,
                    errors:res.data.errors
                })

            }else{
                that.setState({
                    isSaving:false,
                    redirectTo:null,
                    errors:res.data.errors
                })
            }
            
        }).catch(error => {
            that.setState({
                isSaving:false
            })
        })
        
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
    onContactComponentReady(contactComponent){
        this.contactComponent = contactComponent;
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
    render() { 
        if(this.state.redirectTo){
            redirect(this.state.redirectTo)
        }
        let company = this.state.company;
        let isSaving = this.state.isSaving;
        let industry_options = this.getIndustryDropdownOptions();
        let sub_industry_options = this.state.subindustryList.map( item => { return {label:item.subindustry_name, value: item.subindustry_id}}); 
        let lead_capture_type_otpions = Settings.getCompanySource();;
        return (
            <Panel>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title={<>Details</>}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="name" errors={this.state.errors} value={company.name} onChange={this.onCompanyChangeHandler.bind(this)} label="Company Name  *"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="website" errors={this.state.errors}  value={company.website} onChange={this.onCompanyChangeHandler.bind(this)} label="Website"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown name="industry" options={industry_options} errors={this.state.errors}  value={company.industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Industry" />
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown name="sub_industry" options={sub_industry_options} errors={this.state.errors}  value={company.sub_industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Sub-Industry" />
                                    { this.state.isSubindustryLoading ? <Loading/> : ''}
                                </div>
                            </div>
                            
                        </BorderBox>
                        <BorderBox title="Contacts">
                            <Contacts errors={this.state.errors}  onContactReady={this.onContactComponentReady.bind(this) }/>
                        </BorderBox>
                        <BorderBox title="Address">
                            <Address source="company" errors={this.state.errors} exportable={true} onReady={ obj => {this.addressComponent = obj }}/>
                            
                        </BorderBox>
                        <BorderBox title="Notes">
                            <Input name="company_note" label="Notes" value={company.company_note} onChange={this.onCompanyChangeHandler.bind(this)}  type="textarea"/>
                        </BorderBox>
                        

                        
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Activity">
                            <NewActivityForm exportable={true} onReady={ comObj => { this.activyFormObj = comObj}} subject_label="Subject" type_label="Activity Type" date_label="Due"/>
                        </BorderBox>
                        {
                            /**
                             * <BorderBox title="Follow Up Reminder">
                            <FollowUpReminderNew error_date={this.state.errors['follow_up_reminder.reminder_date']} onReady={ obj => { this.followUpRemainderObj = obj }}/>
                        </BorderBox>
                             * 
                             */
                        }
                        
                        <BorderBox title="Linked Properties">
                            <NewCompanyLinkProperty onReady={ objCmp => { this.propertyLinkComponent = objCmp }}/>
                        </BorderBox>
                        <BorderBox title="Lead Capture">
                            <div className="new_company_lead_type">
                                <Dropdown name="lead_capture_type" options={lead_capture_type_otpions} errors={this.state.errors}  value={company.lead_capture_type} onChange={this.onCompanyChangeHandler.bind(this)} label="Lead Type" />
                            </div>
                        </BorderBox>
                    </div>
                </div>
                <FooterSticky>
                    <div className="">{isSaving ? <Loading/> : ''}</div>
                    <DisplayErrors errors={this.state.errors} />
                    <div className="d-flex justify-content-between gap-3">
                        <div>
                            <ShareAccessBtn onReady={ obj => { this.teamAccessComponent = obj }}/>
                        </div>
                        <div>
                            <Button className="no_bg" label="Cancel" href="/company" />
                            <Button label="Create Company" onClick={this.onCreateButtonClick.bind(this)}/>
                        </div>

                    </div>
                </FooterSticky>
            </Panel>
        );
    }
}
const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});

export default connect(mapStateToProps,mapDispatchToProps) (NewCompanyMainForm);

