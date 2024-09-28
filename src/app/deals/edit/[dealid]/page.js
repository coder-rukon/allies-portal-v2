"use client"
import React, { Component } from 'react';
import EditDealPage from './EditDealPage';

class CreateDealPageMain extends Component {
    render() {
        return (
            <div className='create_deal_page'>
               <EditDealPage/>
            </div>
        );
    }
}

export default CreateDealPageMain;