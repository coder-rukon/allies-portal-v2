import React, { Component } from 'react';
import Input from '@/components/forms/Input';
import Dropdown from '@/components/forms/Dropdown';
import Helper from "@/inc/Helper";
import Checkbox from '@/components/forms/checkbox';
class LeaseDetails extends Component {
    onChangeHanlder(event){

    }
    onCheckboxChange(event,value,details){
        /*
        let srDetails = this.state.srDetails;
        this.setState({
            srDetails:{
                ...srDetails,
                [details.name]:value
            }
        })
        */
    }
    render() {
        let isDisable = false;
        let deal = {};
        let errors = [];

        let listingTypeOptions = [{label:'Direct',value:'Direct'},{label:'Sublease',value:'Sublease'}]
        return (
            <div className='deal_lease_details'>
                <div className='row'>
                    <Dropdown  disable={isDisable} name="listing_type" value={deal.listing_type} label="Listing Type" options={listingTypeOptions} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Dropdown  disable={isDisable} name="lease_type" value={deal.rentable_sf} label="Lease Type" options={Helper.getLeaseTypeOptions()} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <div className="col-sm-6 col-xs-12">
                        <Input  disable={isDisable} name="rentable_sf" value={deal.rentable_sf} label="RSF (Rentable SF)" errors={errors}   onChange={this.onChangeHanlder.bind(this)}  />
                        <Checkbox disable={isDisable} name="lease_sf_range" value={deal.lease_sf_range} title="SF Range" cb_style="simple" onChange={this.onCheckboxChange.bind(this)} />
                    </div>
                    
                    <Input name="usable_sf" label="USF (Usable SF)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <Input name="land_ac" label="Land AC" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <div className='col-sm-6 col-xs-12'></div>
                    <Dropdown  disable={isDisable} name="lease_term" value={deal.lease_term} label="Lease Term" options={Helper.getLeaseTermOptions()} errors={errors}   onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                    <div className='col-sm-6 col-xs-12'>
                        <div className='row'>
                            <Input name="rate_per_sf" label="Rate (Per SF)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                            <Input name="rate_per_month" label="Rate (Per Month)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" />
                        </div>
                    </div>
                    <Input name="opex" label="OPEX (Per SF)" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" afterInput ={ e => { return <p>Insurance, taxes, janitorial, utilities, etc.</p>}} />
                    
                    <Input name="monthly_rent" value={deal.monthly_rent} label="Total Monthly Rent" onChange={this.onChangeHanlder.bind(this)} className="col-sm-6 col-xs-12" afterInput ={ e => { return <p>Total dollar amount in rent</p>}} />
                </div>
            </div>
        );
    }
}

export default LeaseDetails;