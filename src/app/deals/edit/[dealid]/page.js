"use client"
import React, { Component } from 'react';
import EditDealPage from './EditDealPage';

class CreateDealPageMain extends Component {
    render() {
        let deal_id = this.props.params.dealid;
        return (
            <div className='create_deal_page'>
               <EditDealPage deal_id={deal_id} />
            </div>
        );
    }
}

export default CreateDealPageMain;