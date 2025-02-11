import React, { Component } from 'react';
import Input from '@/components/forms/Input';
class DealBuyerCriteria extends Component {
    constructor(props){
        super(props);
        this.state ={
            state:[],
            buyer_criteria:{}
        }
    }
    componentDidMount(){
        if(this.props.data){
            this.setState({
                buyer_criteria:this.props.data
            })
        }
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    getData(){
        return this.state.buyer_criteria;
    }
    onChangeHandler(event){
        let buyer_criteria = this.state.buyer_criteria;
        this.setState({
            buyer_criteria:{
                ...buyer_criteria,
                [event.target.name] : event.target.value
            }
        })
    }
    render() {
        let isDisable = false;
        let buyer_criteria = this.state.buyer_criteria;

        return (
            <div className='row'>
                
                <div className="col-xs-12 col-sm-6">
                    <div className='d-flex gap-2 align-items-end'>
                        <Input  disable={isDisable} name="buyer_price_from" errors={this.state.errors}  value={buyer_criteria.buyer_price_from} onChange={this.onChangeHandler.bind(this)} label="Price" />
                        <div className='range_devider'><span></span></div>
                        <Input  disable={isDisable} name="buyer_price_to" errors={this.state.errors}  value={buyer_criteria.buyer_price_to} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                    <div className='d-flex gap-2 align-items-end'>
                        <Input  disable={isDisable} name="buyer_psf_from" errors={this.state.errors}  value={buyer_criteria.buyer_psf_from} onChange={this.onChangeHandler.bind(this)} label="PSF" />
                        <div className='range_devider'><span></span></div>
                        <Input  disable={isDisable} name="buyer_psf_to" errors={this.state.errors}  value={buyer_criteria.buyer_psf_to} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                    <div className='d-flex gap-2 align-items-end'>
                        <Input  disable={isDisable} name="buyer_sf_from" errors={this.state.errors}  value={buyer_criteria.buyer_sf_from} onChange={this.onChangeHandler.bind(this)} label="SF" />
                        <div className='range_devider'><span></span></div>
                        <Input  disable={isDisable} name="buyer_sf_to" errors={this.state.errors}  value={buyer_criteria.buyer_sf_to} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                    <div className='d-flex gap-2 align-items-end'>
                        <Input  disable={isDisable} name="buyer_acreage_from" errors={this.state.errors}  value={buyer_criteria.buyer_acreage_from} onChange={this.onChangeHandler.bind(this)} label="Acreage" />
                        <div className='range_devider'><span></span></div>
                        <Input  disable={isDisable} name="buyer_acreage_to" errors={this.state.errors}  value={buyer_criteria.buyer_acreage_to} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                    <div className='d-flex gap-2 align-items-end'>
                        <Input  disable={isDisable} name="buyer_cap_rate_from" errors={this.state.errors}  value={buyer_criteria.buyer_cap_rate_from} onChange={this.onChangeHandler.bind(this)} label="Cap Rate" />
                        <div className='range_devider'><span></span></div>
                        <Input  disable={isDisable} name="buyer_cap_rate_to" errors={this.state.errors}  value={buyer_criteria.buyer_cap_rate_to} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className='d-flex gap-2 align-items-end'>
                        <Input  disable={isDisable} name="buyer_occupancy_from" errors={this.state.errors}  value={buyer_criteria.buyer_occupancy_from} onChange={this.onChangeHandler.bind(this)} label="Occupancy" />
                        <div className='range_devider'><span></span></div>
                        <Input  disable={isDisable} name="buyer_occupancy_to" errors={this.state.errors}  value={buyer_criteria.buyer_occupancy_to} onChange={this.onChangeHandler.bind(this)} />
                    </div>
                </div>

            </div>
        );
    }
}

export default DealBuyerCriteria;