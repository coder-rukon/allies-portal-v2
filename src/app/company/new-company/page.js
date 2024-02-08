"use client"
import Panel from "@/components/widget/panel";
import BorderBox from "@/components/widget/borderbox";
import Loading from "@/components/widget/Loading";
import Input from "@/components/forms/Input";
import Dropdown from "@/components/forms/Dropdown";
import Button from "@/components/forms/Button";
import Contacts from "@/components/company/new/contacts";
import { Component } from "react";
import Api from "../../../inc/Api";
import Helper from "../../../inc/Helper";
class NewCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSaving:false,
            errors:{},
            company:{
                name:''
            }
        }
    }

    onCreateButtonClick(){
        if(this.state.isSaving){
            return;
        }
        let api = Api,that = this;
        //Helper.setCookie('allies_token','7|ed3Ldx7aV8DO85IsdEp7c3mgDnGLafk9tMZ1sBz060b488a1',300)
        if(!api.setUserToken()){
             location.reload();
        }
        let data = {
            ...this.state.company
        }
        that.setState({
            isSaving:true
        })
        api.axios().post('/company/create',data).then(res=>{
            that.setState({
                isSaving:false,
                errors:res.data.errors
            })
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
    }
    render() { 
        let company = this.state.company;
        let isSaving = this.state.isSaving;
        let industry_options = [
            {
                label:'Agriculture, Forestry, & Fishing',
                value:'',
                items:[
                    {label:'Agriculture Production - Crops',value:'Agriculture Production - Crops'},
                    {label:'Agriculture Production - Livestock and Animal Specialties',value:'Agriculture Production - Livestock and Animal Specialties'},
                    {label:'Agriculture Services',value:'Agriculture Services'},
                    {label:'Forestry',value:'Forestry'},
                    {label:'Fishing, Hunting, and Trapping',value:'Fishing, Hunting, and Trapping'}
                ]
            },
            {
                label:'Mining',
                value:'',
                items:[
                    {label:'Metal Mining',value:'Metal Mining'},
                    {label:'Coal Mining',value:'Coal Mining'},
                    {label:'Oil and Gas Extraction',value:'Oil and Gas Extraction'},
                    {label:'Mining and Quarrying of Nonmetallic Minerals, Except Fuels',value:'Mining and Quarrying of Nonmetallic Minerals, Except Fuels'}
                ]
            }
        ];
        let sub_industry_options = [
            {label:'Wheat',value:'Wheat'},
            {label:'Rice',value:'Rice'},
            {label:'Growing of Vegetables and Melons',value:'Growing of Vegetables and Melons'},
            {label:'Sugarcane Farming',value:'Sugarcane Farming'},
            {label:'Tobacco Farming',value:'Tobacco Farming'},
            {label:'Fiber Crop Farming',value:'Fiber Crop Farming'},
            {label:'Non-perennial Crop Farming',value:'Non-perennial Crop Farming'},
            {label:'Growing of Grapes',value:'Growing of Grapes'},
            {label:'Tropical & Subtropical Fruit Orchards & Farming',value:'Tropical & Subtropical Fruit Orchards & Farming'},
            {label:'Citrus Fruit Orchards & Farming',value:'Citrus Fruit Orchards & Farming'},
            {label:'Growing of Tree and Bush Fruits and Nuts',value:'Growing of Tree and Bush Fruits and Nuts'},
            {label:'Cotton',value:'Cotton'},
            {label:'Tobacco',value:'Tobacco'},
            {label:'Sugarcane and Sugar Beets',value:'Sugarcane and Sugar Beets'},
            {label:'Irish Potatoes Field Crops (Except Cash Grains) NEC',value:'Irish Potatoes Field Crops (Except Cash Grains) NEC'},
            {label:'Vegetables and Melons',value:'Vegetables and Melons'},
            {label:'Berry Crops',value:'Berry Crops'},
            {label:'Grapes',value:'Grapes'},
            {label:'Tree Nuts',value:'Tree Nuts'},
            {label:'Citrus Fruits',value:'Citrus Fruits'},
            {label:'Deciduous Tree Fruits',value:'Deciduous Tree Fruits'},
            {label:'Fruits and Tree Nuts NEC',value:'Fruits and Tree Nuts NEC'},
            {label:'Ornamental Floriculture and Nursery Products',value:'Ornamental Floriculture and Nursery Products'},
            {label:'Food Crops Grown Under Cover',value:'Food Crops Grown Under Cover'},
            {label:'General Farms, Primarily Crop',value:'General Farms, Primarily Crop'}   
        ]; 
        let lead_capture_type_otpions = [
            {label:'Inbound',value:'Inbound'},
            {label:'Outbound',value:'Outbound'},
            {label:'Website',value:'Website'},
            {label:'Google',value:'Google'},
            {label:'Other',value:'Other'}
        ];
        console.log(this.state)
        return (
            <Panel>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Details">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="name" errors={this.state.errors} value={company.name} onChange={this.onCompanyChangeHandler.bind(this)} label="Company Name  *"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="website" errors={this.state.errors}  value={company.website} onChange={this.onCompanyChangeHandler.bind(this)} label="Website"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown name="industry" options={industry_options} errors={this.state.errors}  value={company.industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Industry  *" />
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Dropdown name="sub_industry" options={sub_industry_options} errors={this.state.errors}  value={company.sub_industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Sub-Industry  *" />
                                </div>
                            </div>
                            
                        </BorderBox>
                        <BorderBox title="Contacts">
                            <Contacts/>
                        </BorderBox>
                        <BorderBox title="Address">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_line_1" value={company.address_line_1} onChange={this.onCompanyChangeHandler.bind(this)}  label="Address Line 1 *" errors={this.state.errors}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_line_2" value={company.address_line_2} onChange={this.onCompanyChangeHandler.bind(this)} label="Address Line 2" errors={this.state.errors}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_city" value={company.address_city} onChange={this.onCompanyChangeHandler.bind(this)} label="City  *" errors={this.state.errors}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_state" value={company.address_state} onChange={this.onCompanyChangeHandler.bind(this)} label="State  *" errors={this.state.errors}/>
                                </div>                                
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_county" value={company.address_county} onChange={this.onCompanyChangeHandler.bind(this)} label="Country  *" errors={this.state.errors}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_zipcode" value={company.address_zipcode} onChange={this.onCompanyChangeHandler.bind(this)} label="Zip Code  *" errors={this.state.errors}/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox title="Notes">
                            <Input name="company_note" label="Notes" value={company.company_note} onChange={this.onCompanyChangeHandler.bind(this)}  type="textarea"/>
                        </BorderBox>
                        <div className="mt-3 mb-1">{isSaving ? <Loading/> : ''}</div>
                        
                        <Button label="Create Company" onClick={this.onCreateButtonClick.bind(this)}/>
                        
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Current Deals">
                            <div className="current_deals_demo">
                                <p>No Current Deals</p>
                                <Button label="+ Create Deal"/>
                            </div>
                        </BorderBox>
                        <BorderBox title="Previous Deals">
                            <div className="current_deals_demo">
                                <p>No Previous Deals</p>
                            </div>
                        </BorderBox>
                        <BorderBox title="Team Access">
                            <div className="new_team_access_list">
                                <p>No Previous Deals</p>
                            </div>
                            <Button label="+ Team Member"/>
                        </BorderBox>
                        <BorderBox title="Linked Properties">
                            <div className="property_links">
                                <p>No Linked Properties</p>
                            </div>
                            <Button label="+ Link Property"/>
                        </BorderBox>
                        <BorderBox title="Lead Capture">
                            <div className="new_company_lead_type">
                                <Dropdown name="lead_capture_type" options={lead_capture_type_otpions} errors={this.state.errors}  value={company.lead_capture_type} onChange={this.onCompanyChangeHandler.bind(this)} label="Lead Type" />
                            </div>
                        </BorderBox>
                    </div>
                </div>
                
            </Panel>
        );
    }
}
 
export default NewCompany;

