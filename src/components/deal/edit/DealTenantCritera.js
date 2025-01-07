import React, { Component } from 'react';
import Helper from "@/inc/Helper";
import Address from '@/components/address/Address';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import Settings from '@/inc/Settings';
class DealTenantCritera extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors:[]
        }
    }
    onChangeHandler(event){

    }
    render() {
        let isDisable = false;
        let tenant = {}
        let tenantSizeOptions = [{label:'SF', value:'sf'},{label:'Acreage', value:'acreage'}]
        return (
            <div className='deal_tenant_critera'>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="rate_type" options={Helper.tenancyOptions()} errors={this.state.errors}  value={tenant.property_tenancy} onChange={this.onChangeHandler.bind(this)} label="Rate Type" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className='d-flex gap-2 align-items-end'>
                            <Input  disable={isDisable} name="rate_range_from" errors={this.state.errors}  value={tenant.rate_range_from} onChange={this.onChangeHandler.bind(this)} label="Rate Range" />
                            <div className='range_devider'><span></span></div>
                            <Input  disable={isDisable} name="rate_range_to" errors={this.state.errors}  value={tenant.rate_range_to} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="tenant_size" options={tenantSizeOptions} errors={this.state.errors}  value={tenant.tenant_size} onChange={this.onChangeHandler.bind(this)} label="Size" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className='d-flex gap-2 align-items-end'>
                            <Input  disable={isDisable} name="size_range_from" errors={this.state.errors}  value={tenant.size_range_from} onChange={this.onChangeHandler.bind(this)} label="Size Range" />
                            <div className='range_devider'><span></span></div>
                            <Input  disable={isDisable} name="size_range_to" errors={this.state.errors}  value={tenant.size_range_to} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="lease_term" options={Helper.tenancyOptions()} errors={this.state.errors}  value={tenant.lease_term} onChange={this.onChangeHandler.bind(this)} label="Lease Term" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DealTenantCritera;