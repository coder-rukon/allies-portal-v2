"use client"
import Link from 'next/link';
import React, { Component } from 'react';
import Panel from "@/components/widget/panel";
import Industry from '@/components/settings/Industry'
import Subindustry from '@/components/settings/Subindustry'
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
        return <></>
    }
    render() {
        let page = this.state.page;
        return (
            <div className='settings_page_wraper'>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <span className={ page == 'industry' ? 'nav-link active' : 'nav-link'} onClick={ e => {this.changePage('industry')} } style={{cursor:'pointer'}}>Industry</span>
                    </li>
                    <li class="nav-item">
                        <span className={ page == 'subindustry' ? 'nav-link active' : 'nav-link'} onClick={ e => {this.changePage('subindustry')} } style={{cursor:'pointer'}}>Subindustry</span>
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