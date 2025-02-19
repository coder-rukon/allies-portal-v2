import Checkbox from '@/components/forms/checkbox';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import BorderBox from '@/components/widget/borderbox';
import React, { Component } from 'react';

class SrDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            srDetails:{}
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this);
        }
        if(this.props.data){
            this.setState({
                srDetails:this.props.data
            })
        }
    }
    getData(){
        return this.state.srDetails;
    }
    onChangeHandler(event){
        let srDetails = this.state.srDetails;
        this.setState({
            srDetails:{
                ...srDetails,
                [event.target.name]:event.target.value
            }
        })
    }
    render() {
        let srDetails = this.state.srDetails;
        let investment_type_options = [];
        let isDisable = false;
        return (
            <>
                <BorderBox title="Sale Details">
                    <div className='row'>
                        <Input name="asking_price" value={srDetails.asking_price} label="Asking Price" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="psf" value={srDetails.psf} label="PSF" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                    </div>
                    
                </BorderBox>
                <BorderBox title="Investment Details">
                    <div className='row'>
                        <Dropdown name="investment_type" value={srDetails.investment_type} options={investment_type_options} label="Investment Type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="investment_subtype" value={srDetails.investment_subtype} label="Investment Subtype" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="occupancy" value={srDetails.occupancy} label="Occupancy" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="occupancy_date" value={srDetails.occupancy_date} label="Occupancy Date" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="net_operating_income" value={srDetails.net_operating_income} label="Net Operating Income" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="cap_rate" value={srDetails.cap_rate} label="Cap Rate" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="pro_forma_noi" value={srDetails.pro_forma_noi} label="Pro-Forma NOI" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="pro_forma_cap_rate" value={srDetails.pro_forma_cap_rate} label="Pro-Forma Cap Rate" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="price_unit" value={srDetails.price_unit} label="Price/Unit" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="price_sf" value={srDetails.price_sf} label="Price/SF" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input 
                            name="price_sf_land_value" 
                            value={srDetails.price_sf_land_value} 
                            label="Price/SF (Land Value)" 
                            onChange={this.onChangeHandler.bind(this)} 
                            className="col-xs-12 col-sm-6"
                            dropdownValue= {srDetails.price_sf_land_value_unit}
                            options = {
                                [{ name:'price_sf_land_value_unit',  disable:isDisable, title:"SF", value:'sf',onChange:this.onChangeHandler.bind(this),checked:srDetails.price_sf_land_value_unit == 'sf' ? true : false },{ name:'price_sf_land_value_unit', title:"Acre", value:'acre',checked:srDetails.price_sf_land_value_unit == 'acre' ? true : false,disable:isDisable,onChange:this.onChangeHandler.bind(this) }]
                            }
                        />
                    </div>
                        <Checkbox name="sf_range" cb_style = 'simple' value={srDetails.sf_range} label="SF Range" onChange={this.onChangeHandler.bind(this)}/>
                </BorderBox> 
                <BorderBox title="Investment - Lease and Tenant Information">
                    <div className='row'>
                        <Dropdown name="lease_type" value={srDetails.lease_type} options={investment_type_options} label="Lease Type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Dropdown name="tenant_credit" value={srDetails.tenant_credit} options={investment_type_options} label="Tenant Credit" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Dropdown name="tenancy" value={srDetails.tenancy} options={investment_type_options} label="Tenancy" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="number_of_tenants" value={srDetails.number_of_tenants} label="Number of Tenants" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="lease_commencement_date" value={srDetails.lease_commencement_date} label="Lease Commencement" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="lease_expiration_date" value={srDetails.lease_expiration_date} label="Lease Expiration" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="lease_term_years" value={srDetails.lease_term_years} label="Lease Term (Years)" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="remaining_term_years" value={srDetails.remaining_term_years} label="Remaining Term (Years)" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="lease_options" value={srDetails.lease_options} label="Lease Options" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="ground_lease" value={srDetails.ground_lease} label="Ground Lease" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="ground_lease_expiration_date" value={srDetails.ground_lease_expiration_date} label="Ground Lease Expiration" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="ground_lease_remaining" value={srDetails.ground_lease_remaining} label="Ground Lease Remaining" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="parking_type" value={srDetails.parking_type} label="Parking Type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="rent_bumps" value={srDetails.rent_bumps} label="Rent Bumps" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                    </div>
                </BorderBox>
            </>
        );
    }
}

export default SrDetails;