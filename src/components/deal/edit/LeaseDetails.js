import React, { Component } from 'react';
import Input from '@/components/forms/Input';
import Dropdown from '@/components/forms/Dropdown';
import Helper from "@/inc/Helper";
class LeaseDetails extends Component {
    onChangeHanlder(event){

    }
    render() {
        let isDisable = false;
        let deal = {};
        let errors = [];
        let rateType = []
        return (
            <div className='deal_lease_details'>
                <div className='row'>
                    <Dropdown  disable={isDisable} name="rate_type" value={deal.rate_type} label="Rate Type" options={rateType} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Dropdown  disable={isDisable} name="listing_type" value={deal.listing_type} label="Listing Type" options={rateType} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Dropdown  disable={isDisable} name="rentable_sf" value={deal.rentable_sf} label="RSF (Rentable SF)" options={rateType} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Input name="usable_sf" label="USF (Usable SF)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Dropdown  disable={isDisable} name="lease_type" value={deal.rentable_sf} label="Lease Type" options={rateType} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <div className='col-sm-6 col-xs-12'></div>
                    <Input name="rate" label="Rate (Per SF)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Dropdown  disable={isDisable} name="lease_term" value={deal.lease_term} label="Lease Term" options={rateType} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Input name="opex" label="OPEX (Per SF)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" afterInput ={ e => { return <p>Insurance, taxes, janitorial, utilities, etc.</p>}} />
                    <div className='col-sm-6 col-xs-12'></div>
                    <Input name="monthly_rent" value={deal.monthly_rent} label="Total Monthly Rent" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" afterInput ={ e => { return <p>Total dollar amount in rent</p>}} />
                </div>
            </div>
        );
    }
}

export default LeaseDetails;