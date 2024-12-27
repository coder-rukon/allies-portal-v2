"use client"
import Link from 'next/link';
import React, { Component } from 'react';
import Panel from "@/components/widget/panel";
import Industry from '@/components/settings/Industry'
import Subindustry from '@/components/settings/Subindustry'
import CompanyAccessRoles from '@/components/settings/roles/CompanyAccessRole'
import PropertySubTypes from '../../components/settings/PropertySubTypes';
class SettingsMainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            page:'industry'
        }
    }
    changePage(pageName){
        this.setState({
            page:pageName
        })
    }
    getPage(){
        let page = this.state.page;
        if(page == 'industry'){
            return <Industry/>
        }
        if(page == 'subindustry'){
            return <Subindustry/>
        }
        if(page == 'company_acess_role'){
            return <CompanyAccessRoles/>
        }
        if(page == 'subtypes'){
            return <PropertySubTypes/>
        }
        return <></>
    }
    render() {
        let page = this.state.page;
        return (
            <div className='settings_page_wraper'>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <span className={ page == 'industry' ? 'nav-link active' : 'nav-link'} onClick={ e => {this.changePage('industry')} } style={{cursor:'pointer'}}>Industry</span>
                    </li>
                    <li className="nav-item">
                        <span className={ page == 'subindustry' ? 'nav-link active' : 'nav-link'} onClick={ e => {this.changePage('subindustry')} } style={{cursor:'pointer'}}>Subindustry</span>
                    </li>
                    <li className="nav-item">
                        <span className={ page == 'company_acess_role' ? 'nav-link active' : 'nav-link'} onClick={ e => {this.changePage('company_acess_role')} } style={{cursor:'pointer'}}>Company User Role</span>
                    </li> 
                    <li className="nav-item">
                        <span className={ page == 'subtypes' ? 'nav-link active' : 'nav-link'} onClick={ e => {this.changePage('subtypes')} } style={{cursor:'pointer'}}>Property Subtype</span>
                    </li>
                </ul>
                <Panel>
                    {this.getPage()}
                </Panel>
            </div>

        );
    }
}

export default SettingsMainPage;