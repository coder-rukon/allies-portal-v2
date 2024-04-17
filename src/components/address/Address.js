import React, { Component } from 'react';
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Loading from '../widget/Loading';
import Dropdown from '../forms/Dropdown';
class Address extends Component {
    constructor(props){
        super(props);
        this.source = this.props.source;
        this.integrator = this.props.integrator;
        this.state = {
            address:{}
        }
    }
    componentDidMount(){
        this.loadAddress()
    }
    loadAddress(){
        let api = Api;
        let that = this;
        that.setState({
            loading:true
        })
        if(api.setUserToken()){
            api.axios().get('/address/get/'+this.source+'/'+this.integrator).then(res =>{
                that.setState({
                    loading:false,
                    address:res.data.type ? res.data.data : {}
                })
            }).catch(error => {
                that.setState({
                    loading:false
                })
            })
        }

    }
    onAddressChangeHandler(event){
        let address = this.state.address;
        this.setState({
            address:{
                ...address,
                [event.target.name]:event.target.value
            }
        })
    }
    render() {
        let address = this.state.address;
        if(this.state.loading){
            return <Loading/>
        }
        let countryList = [];
        return (
            <div className='row'>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onAddressChangeHandler.bind(this)}  name="address_line_1" label="Address Line 1" value={address.address_line_1}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onAddressChangeHandler.bind(this)}  name="address_line_2" label="Address Line 2" value={address.address_line_2}/>
                </div>
               
                
                <div className="col-xs-12 col-sm-6">
                    <Dropdown options={countryList} onChange={this.onAddressChangeHandler.bind(this)} name="address_country" label="Country" value={address.address_country}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Dropdown options={countryList} onChange={this.onAddressChangeHandler.bind(this)} name="address_state" label="State" value={address.address_state}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onAddressChangeHandler.bind(this)}  name="address_city" label="City" value={address.address_city}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onAddressChangeHandler.bind(this)}  name="address_zipcode" label="Zipcode" value={address.address_zipcode}/>
                </div>
            </div>
        );
    }
}

export default Address;