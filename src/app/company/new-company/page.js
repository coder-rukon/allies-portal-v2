"use client"
import Panel from "@/components/widget/panel";
import BorderBox from "@/components/widget/borderbox";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";
import Contacts from "@/components/company/new/contacts";
import { Component } from "react";
class NewCompany extends Component {
    render() { 
        return (
            <Panel>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <BorderBox title="Details">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="company_name" label="Company Name"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="website" label="Website"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="industry" label="Industry"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="sub_industry" label="Sub-Industry"/>
                                </div>
                            </div>
                            
                        </BorderBox>
                        <BorderBox title="Contacts">
                            <Contacts/>
                        </BorderBox>
                        <BorderBox title="Address">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_line1" label="Address Line 1"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="address_line2" label="Address Line 2"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="city" label="City"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="state" label="State"/>
                                </div>                                
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="country" label="Country"/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="zip_code" label="Zip Code"/>
                                </div>
                            </div>
                        </BorderBox>
                        <BorderBox title="Notes">
                            <Input name="notes" label="Notes" type="textarea"/>
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
                            </div>
                        </BorderBox>
                    </div>
                </div>
                
            </Panel>
        );
    }
}
 
export default NewCompany;

