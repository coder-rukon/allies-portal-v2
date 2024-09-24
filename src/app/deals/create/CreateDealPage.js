"use client"
import React, { Component } from 'react';
import Panel from "@/components/widget/panel";
import Helper from "@/inc/Helper";
import UploadClientEngagementLetter from '@/components/deal/UploadClientEngagementLetter';
import CreateDealInit from '../../../components/deal/create/CreateDealInit';
import Address from '@/components/address/Address';
import BorderBox from '@/components/widget/borderbox';
import Button from '@/components/forms/button';
class CreateDealPage extends Component {
    constructor(props){
        super(props);
        this.state={
            selected_deal_type:null,
            step:'deal_n_property_type' // deal_n_property_type , upload_client_agl
        }
    }
    componentDidMount(){
        Helper.setPageData({
            title:'Create New Deal',
            pageTitle:'Create New Deal'
        })
    }
    onDealTypeSelect(data){
        if(this.state.selected_deal_type && this.state.selected_deal_type.id == data.id){
            this.setState({
                selected_deal_type:null
            })
        }else{
            this.setState({
                selected_deal_type:data,
                //step:'upload_client_agl'
            })
        }
        
    }
    displayAddressStep(){
        if(!this.state.selected_deal_type || this.state.selected_deal_type?.id == 5 || this.state.selected_deal_type?.id  == 6){
            return;
        }
        return(
            <div className='create_deal_address'>
                <BorderBox title="Property Address" className="mt-4">
                    <Address/>
                </BorderBox>
                <Button  label="Continue" className="mt-4"/>
            </div>
            
        )
    }
    render() {
        return (
            <div>
                <Panel>
                    {this.state.step == 'deal_n_property_type' ? <CreateDealInit onTypeSelect = { this.onDealTypeSelect.bind(this)}/> : ''}
                    { this.state.selected_deal_type?.id == 5 || this.state.selected_deal_type?.id == 6 ? <UploadClientEngagementLetter/> : ''}
                    {this.displayAddressStep()}
                </Panel>
            </div>
        );
    }
}

export default CreateDealPage;