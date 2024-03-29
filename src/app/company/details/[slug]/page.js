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
class CompanyDetails  extends Component{
    constructor(props){
        super(props);
        this.state = {
            editMode:false,
            company:{},
            errors:{},
            isLoading:false
        }
    }
    componentDidMount(){
        let companyId = this.props.params.slug;
        this.loadCompany(companyId);
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
                    that.setState({
                        isLoading:false,
                        company:res.data.data.company
                    })
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
    }
    onSaveClick(){
        this.setState({
            isLoading:true
        })
        let api = Api, that = this;
        let company = this.state.company;
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
    render() {
        let isDisable = !this.state.editMode;
        let editMode = this.state.editMode;
        if(this.state.isLoading){
            return <Panel className="text-center"><Loading/></Panel>
        }
        let company = this.state.company;
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
        return(
            <Panel className=" input_box_margin_fix">
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
                        <div className="col-xs-12 col-sm-6">
                            <BorderBox title="Details">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable}  onChange={this.onCompanyChangeHandler.bind(this)}  name="name" label="Company Name" value={company.name}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable}  onChange={this.onCompanyChangeHandler.bind(this)} name="website" label="Website" value={company.website}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Dropdown disable={isDisable}  name="industry" options={industry_options} errors={this.state.errors}  value={company.industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Industry  *" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Dropdown disable={isDisable} name="sub_industry" options={sub_industry_options} errors={this.state.errors}  value={company.sub_industry} onChange={this.onCompanyChangeHandler.bind(this)} label="Sub-Industry  *" />
                                    </div>
                                </div>
                                
                            </BorderBox>
                            <BorderBox title="Contacts">
                                {company.company_id ? <Contacts disable={isDisable} source="company" integrator={company.company_id}/> : '' } 
                            </BorderBox>
                            <BorderBox title="Address">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="address_line_1"  disable={isDisable} value={company.address_line_1} onChange={this.onCompanyChangeHandler.bind(this)}  label="Address Line 1 *" errors={this.state.errors}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="address_line_2"  disable={isDisable} value={company.address_line_2} onChange={this.onCompanyChangeHandler.bind(this)} label="Address Line 2" errors={this.state.errors}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="address_city"  disable={isDisable} value={company.address_city} onChange={this.onCompanyChangeHandler.bind(this)} label="City  *" errors={this.state.errors}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="address_state"  disable={isDisable} value={company.address_state} onChange={this.onCompanyChangeHandler.bind(this)} label="State  *" errors={this.state.errors}/>
                                    </div>                                
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="address_county"  disable={isDisable} value={company.address_county} onChange={this.onCompanyChangeHandler.bind(this)} label="Country  *" errors={this.state.errors}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="address_zipcode"  disable={isDisable} value={company.address_zipcode} onChange={this.onCompanyChangeHandler.bind(this)} label="Zip Code  *" errors={this.state.errors}/>
                                    </div>
                                </div>
                            </BorderBox>
                            <BorderBox title="Notes">
                               {company.company_id ? <Notes source="company" integrator={company.company_id}/> : '' } 
                            </BorderBox>
                            <div className="mt-3"></div>
                            {isDisable ? '' : <Button label="Save Company" onClick={ this.onSaveClick.bind(this) } /> }
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
                                <Dropdown name="lead_capture_type"  disable={isDisable} options={lead_capture_type_otpions} errors={this.state.errors}  value={company.lead_capture_type} onChange={this.onCompanyChangeHandler.bind(this)} label="Lead Type" />
                                </div>
                            </BorderBox>
                        </div>
                    </div>
                    
                </Panel>
        )
    }
}
export default CompanyDetails;