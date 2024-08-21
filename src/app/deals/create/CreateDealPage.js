"use client"
import React, { Component } from 'react';
import Panel from "@/components/widget/panel";
import Helper from "@/inc/Helper";
import DealType from '../../../components/deal/create/DealType';
import UploadClientEngagementLetter from '@/components/deal/UploadClientEngagementLetter';
class CreateDealPage extends Component {
    constructor(props){
        super(props);
        this.state={
            step:'deal_n_property_type' // deal_n_property_type , upload_client_agl
        }
    }
    componentDidMount(){
        Helper.setPageData({
            title:'Create New Deal',
            pageTitle:'Create New Deal'
        })
    }
    onDealTypeSelect(){
        this.setState({
            step:'upload_client_agl'
        })
    }
    render() {
        return (
            <div>
                <Panel>
                    {this.state.step == 'deal_n_property_type' ? <DealType onTypeSelect = { this.onDealTypeSelect.bind(this)}/> : ''}
                    {this.state.step == 'upload_client_agl' ? <UploadClientEngagementLetter/> : ''}
                    
                </Panel>
            </div>
        );
    }
}

export default CreateDealPage;