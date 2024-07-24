"use client"
import React, { Component } from 'react';
import CompanyDetails from './CompanyDetails';
class CmpDetailsPage extends Component {
    render() {
        let company_id = this.props.params.slug
        return (
            <CompanyDetails company_id={company_id}/>
        );
    }
}

export default CmpDetailsPage;