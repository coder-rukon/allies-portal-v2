"use client"
import React, { Component } from 'react';
import Panel from "@/components/widget/panel";
import Helper from "@/inc/Helper";
import DealCreateCompayForm from '@/components/deal/create/DealCreateCompayForm';
import CreateDealInit from '../../../components/deal/create/CreateDealInit';
import Address from '@/components/address/Address';
import BorderBox from '@/components/widget/borderbox';
import Button from '@/components/forms/button';
import Api from '@/inc/Api';
import Loading from '@/components/widget/Loading';
import DisplayErrors from '@/components/widget/DisplayErrors';
import Settings from '@/inc/Settings';
import { redirect } from 'next/navigation';
class CreateDealPage extends Component {
    constructor(props){
        super(props);
        this.state={
            isCreated:false,
            deal_id:null,
            isCreating:false,
            selected_deal_type:[],
            addressError:null,
            companyError:null,
            step:'deal_n_property_type' // deal_n_property_type , upload_client_agl
        }
        this.addressObj = null;
        this.companyObj = null;
    }
    componentDidMount(){
        Helper.setPageData({
            title:'Create New Deal',
            pageTitle:'Create New Deal'
        })
    }
    onDealTypeSelect(data){
        console.log(data)
        this.setState({
            selected_deal_type:data
        })
    }
    createDealFromProperty(){
        if(!this.addressObj){
            return;
        }
        let that = this, api = Api;
        that.setState({
            addressError:null,
            isCreating:true
        })
        let data = {
            landlord_rep: this.state.selected_deal_type.includes(7) ? 'yes' : 'no',
            seller_rep:this.state.selected_deal_type.includes(8) ? 'yes' : 'no',
            tenant_rep:'no',
            buyer_rep:'no',
            ...this.addressObj.getAddress()
        }

        if(api.setUserToken()){
            api.axios().post('/deal/create',data).then(res => {
                if(res.data.type){
                    that.setState({
                        isCreated:true,
                        deal_id:res.data.data.deal.deal_id,
                        addressError: null,
                        isCreating:false
                    })
                }else{
                    that.setState({
                        addressError: res.data.errors,
                        isCreating:false
                    })
                }
                
            })
        }
    } 
    createDealFromCompany(){
        if(!this.companyObj){
            return;
        }
        let that = this, api = Api;
        that.setState({
            companyError:null,
            isCreating:true
        })
        let data = {
            landlord_rep: 'no',
            seller_rep:'no',
            tenant_rep:this.state.selected_deal_type.includes(5) ? 'yes' : 'no',
            buyer_rep:this.state.selected_deal_type.includes(6) ? 'yes' : 'no',
            ...this.companyObj.getData()
        }

        if(api.setUserToken()){
            api.axios().post('/deal/create',data).then(res => {
                if(res.data.type){
                    that.setState({
                        isCreated:true,
                        deal_id:res.data.data.deal.deal_id,
                        companyError: null,
                        isCreating:false
                    })
                }else{
                    that.setState({
                        companyError: res.data.errors,
                        isCreating:false
                    })
                }
                
            })
        }
    }
    dealCreatePropertyAddress(){
        return(
            <div className='create_deal_address'>
                <BorderBox title="Property Address" className="mt-4">
                    <Address source="property" onReady={ comObj => this.addressObj = comObj } isSearchable={true}/>
                </BorderBox>
                <div className="mt-4">
                    {this.state.addressError ? <DisplayErrors errors={this.state.addressError} /> : '' }
                    <Button disable={this.state.isCreating} onClick ={this.createDealFromProperty.bind(this)} label="Continue" />
                    {this.state.isCreating ? <><br/><Loading/></> : ''}
                </div>
            </div>
            
        )
    }
    dealCreateCompanyForm(){
        return(
            <div className='create_deal_comapny mt-4'>
                <DealCreateCompayForm selected_deal_type={this.state.selected_deal_type} onReady={ objCom => {this.companyObj = objCom }}/>
                <div className="mt-4">
                    {this.state.companyError ? <DisplayErrors errors={this.state.companyError} /> : '' }
                    <Button disable={this.state.isCreating} onClick ={this.createDealFromCompany.bind(this)} label="Continue" />
                    {this.state.isCreating ? <><br/><Loading/></> : ''}
                </div>
            </div>
        )
    }
    render() {
        if(this.state.isCreated && this.state.deal_id){
            redirect('/deals/edit/'+this.state.deal_id)
        }
        return (
            <div>
                <Panel>
                    {this.state.step == 'deal_n_property_type' ? <CreateDealInit onTypeSelect = { this.onDealTypeSelect.bind(this)}/> : ''}
                    { this.state.selected_deal_type.includes(5)|| this.state.selected_deal_type.includes(6) ? this.dealCreateCompanyForm() : ''}
                    {this.state.selected_deal_type.includes(7) || this.state.selected_deal_type.includes(8) ? this.dealCreatePropertyAddress() : ''}
                </Panel>
            </div>
        );
    }
}

export default CreateDealPage;