"use client"
import Panel from "@/components/widget/panel";
import BorderBox from "@/components/widget/borderbox";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";
import Contacts from "@/components/company/new/contacts";
import { Component } from "react";
import Api from "@/inc/Api";
import Loading from "@/components/widget/Loading";
class CompanyDetails  extends Component{
    constructor(props){
        super(props);
        this.state = {
            editMode:false,
            company:{},
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
    onSaveClick(){
        this.setState({
            editMode:false
        })
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
                                        <Input disable={isDisable}  name="company_name" label="Company Name" value={company.name}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="website" label="Website" value={company.website}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="industry" label="Industry" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="sub_industry" label="Sub-Industry"/>
                                    </div>
                                </div>
                                
                            </BorderBox>
                            <BorderBox title="Contacts">
                                <Contacts/>
                            </BorderBox>
                            <BorderBox title="Address">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="address_line1" label="Address Line 1"/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="address_line2" label="Address Line 2"/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="city" label="City"/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="state" label="State"/>
                                    </div>                                
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="country" label="Country"/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input disable={isDisable} name="zip_code" label="Zip Code"/>
                                    </div>
                                </div>
                            </BorderBox>
                            <BorderBox title="Notes">
                                <Input disable={isDisable} name="notes" label="Notes" type="textarea"/>
                            </BorderBox>
                            <div className="mt-3"></div>
                            <Button label="Create Company"/>
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
                                    <p>Lead Type</p>
                                    <select>
                                        <option>Lead 1</option>
                                        <option>Lead 2</option>
                                        <option>Lead 3</option>
                                        <option>Lead 4</option>
                                    </select>
                                </div>
                            </BorderBox>
                        </div>
                    </div>
                    
                </Panel>
        )
    }
}
export default CompanyDetails;