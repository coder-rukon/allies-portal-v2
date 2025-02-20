import React, { Component } from 'react';
import Helper from "@/inc/Helper";
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
class DealTenantCriteria extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors:[],
            tenantCriteria:{
                rate_type:null,
                rate_range_from:null,
                rate_range_to:null,
                size:null,
                size_range_from:null,
                size_range_to:null,
                lease_term:null
            }
        }
    }
    componentDidMount(){
        this.setState({
            tenantCriteria:this.props.data
        })
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    onChangeHandler(event){
        let tenantCriteria = this.state.tenantCriteria;
        this.setState({
            tenantCriteria:{
                ...tenantCriteria,
                [event.target.name]:event.target.value
            }
        })
    }
    getData(){
        return this.state.tenantCriteria;
    }
    render() {
        let isDisable = false;
        let tenant = this.state.tenantCriteria;
        //let tenantSizeOptions = [{label:'SF', value:'SF'},{label:'Acreage', value:'Acreage'}]
        //let leaseTermOptions = [{label:'NNN', value:'NNN'}]
        return (
            <div className='deal_tenant_criteria'>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable={isDisable} name="rate_type" options={Helper.getRateTypeOptions()} errors={this.state.errors}  value={tenant.rate_type} onChange={this.onChangeHandler.bind(this)} label="Rate Type" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className='d-flex gap-2 align-items-end'>
                            <Input  disable={isDisable} name="rate_range_from" errors={this.state.errors}  value={tenant.rate_range_from} onChange={this.onChangeHandler.bind(this)} label="Rate Range" />
                            <div className='range_devider'><span></span></div>
                            <Input  disable={isDisable} name="rate_range_to" errors={this.state.errors}  value={tenant.rate_range_to} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className='d-flex gap-2 align-items-end'>
                            <Input  disable={isDisable} name="building_sf_range_from" errors={this.state.errors}  value={tenant.building_sf_range_from} onChange={this.onChangeHandler.bind(this)} label="Building SF Range" />
                            <div className='range_devider'><span></span></div>
                            <Input  disable={isDisable} name="building_sf_range_to" errors={this.state.errors}  value={tenant.building_sf_range_to} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className='d-flex gap-2 align-items-end'>
                            <Input  disable={isDisable} name="land_ac_range_from" errors={this.state.errors}  value={tenant.land_ac_range_from} onChange={this.onChangeHandler.bind(this)} label="Land AC Range" />
                            <div className='range_devider'><span></span></div>
                            <Input  disable={isDisable} name="land_ac_range_to" errors={this.state.errors}  value={tenant.land_ac_range_to} onChange={this.onChangeHandler.bind(this)} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                            <Input  disable={isDisable} label="Geography" name="geography" errors={this.state.errors}  value={tenant.geography} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                            <Input  disable={isDisable} label="Timing" name="timing" errors={this.state.errors}  value={tenant.timing} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DealTenantCriteria;