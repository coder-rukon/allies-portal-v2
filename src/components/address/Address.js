import React, { Component } from 'react';
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Loading from '../widget/Loading';
import Dropdown from '../forms/Dropdown';
import { connect } from 'react-redux';
import ActionsTypes from '@/inc/ActionTypes';
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
        this.loadCountry();
        this.loadState();
        if(!this.props.exportable){
            this.loadAddress();
        }
        if(this.props.onReady){
            this.props.onReady(this)
        }
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
    loadCountry(){
        if(this.props.locations.countryLoaded){
            return true;
        }
        let api = Api;
        let that = this;
        if(api.setUserToken()){
            api.axios().get('/location/country').then(res =>{
                that.props.setCountry(res.data)
            })
        }
    }
    loadState(){
        if(this.props.locations.stateLoaded){
            return true;
        }
        let api = Api;
        let that = this;
        if(api.setUserToken()){
            api.axios().get('/location/state').then(res =>{
                that.props.setState(res.data)
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
    getCountryState(){
        let address = this.state.address;
        let stateList = [];
        this.props.locations.state.forEach( item => {
            if(address.address_country){
                if(address.address_country == item.country_id){
                    stateList.push({
                        label: item.name,
                        value: item.id
                    }) 
                }
            }else{
                stateList.push({
                    label: item.name,
                    value: item.id
                }) 
            }
            
        })
        return stateList;
    }
    getAddress(){
        return this.state.address;
    }
    render() {
        let address = this.state.address;
        if(this.state.loading){
            return <Loading/>
        }
        let countryList = this.props.locations.country.map( item => {
            return {
                label: item.name,
                value: item.id
            }
        })
        let stateList = this.getCountryState();
        let disable= this.props.disable === true ? true : false;
        
        return (
            <div className='row'>
                <div className="col-xs-12 col-sm-6">
                    <Input disable = {disable} onChange={this.onAddressChangeHandler.bind(this)}  name="address_line_1" label="Address Line 1" value={address.address_line_1}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input  disable = {disable} onChange={this.onAddressChangeHandler.bind(this)}  name="address_line_2" label="Address Line 2" value={address.address_line_2}/>
                </div>
               
                
                <div className="col-xs-12 col-sm-6">
                    <Dropdown  disable = {disable} options={countryList} onChange={this.onAddressChangeHandler.bind(this)} name="address_country" label="Country" value={address.address_country}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Dropdown  disable = {disable} options={stateList} onChange={this.onAddressChangeHandler.bind(this)} name="address_state" label="State" value={address.address_state}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input  disable = {disable} onChange={this.onAddressChangeHandler.bind(this)}  name="address_city" label="City" value={address.address_city}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input  disable = {disable} onChange={this.onAddressChangeHandler.bind(this)}  name="address_zipcode" label="Zipcode" value={address.address_zipcode}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    locations: state.locations,
});
const mapDispatchToProps = (dispatch) => ({
    setCountry: (data) => dispatch({type: ActionsTypes.SET_LOCATION_COUNTRY,data:data}),
    setState: (data) => dispatch({type:ActionsTypes.SET_LOCATION_STATE,data:data}),
});
export default connect(mapStateToProps,mapDispatchToProps) (Address);