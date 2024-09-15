"use client"
import React, { Component } from 'react';
import ActiveDeals from '../../components/deal/activedeals/ActiveDeals';
import Helper from '@/inc/Helper';

class Page extends Component {
    componentDidMount(){
        Helper.setPageData({
            pageTitle:'Active Deals',
            title:'Active Deals'
        })
    }
    render() {
        return (
            <div >
                <ActiveDeals/>
            </div>
        );
    }
}

export default Page;