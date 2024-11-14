'use client'
import React, { Component } from 'react';
import Prospects from '@/components/prospects/Prospects';
class Page extends Component {
    render() {
        return (
            <div className='prospects_page'>
                <Prospects/>
            </div>
        );
    }
}

export default Page;