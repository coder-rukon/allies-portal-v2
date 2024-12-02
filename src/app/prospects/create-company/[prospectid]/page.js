'use client'
import React, { Component } from 'react';
import NewCompanyMainForm from '../../../company/new-company/NewCompanyMainForm';
import Helper from '@/inc/Helper';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            prospect:{}
        }
    }
    
    componentDidMount(){
        Helper.setPageData({
            title:'Create company from prospect',
            pageTitle:'Create company from prospect'
        })
        this.loadProspect();
    }
    loadProspect(){
        let prospect_id = this.props?.params?.prospectid;
        let api = Api;
        let that = this;
        that.setState({
            isLoading:true
        })
        if(!api.setUserToken()){
            return;
        }
        api.axios().get('/prospects/details/'+prospect_id).then(res => {
            that.setState({
                isLoading:false,
                prospect:res.data.data
            })
        })

    }
    getDefaultData(){
        let prospect = this.state.prospect;
        if(!prospect.id){
            return {}
        }
        let allData = prospect.data;
        let data = {
            prospect_id:prospect.id,
            name:prospect?.company_name,
            lead_capture_type:prospect?.prospect_source,
            address:prospect.address,
            contacts:[
                {
                    contact_name:prospect.contact_name,
                    title:prospect.title,
                    email:prospect.email,
                    phone:prospect.phone,
                }
            ]
        }
        return data;
    }
    render() {
        if(this.state.isLoading){
            return(
                <div className='text-center'><Loading/></div>
            )
        }
        return (
            <div className='create_company_from_prospect'>
                <NewCompanyMainForm defaultData={this.getDefaultData()}/>
            </div>
        );
    }
}

export default Page;