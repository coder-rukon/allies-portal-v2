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
        this.addressChanged = false;
        this.state = {
            searching:false,
            searchResult:[],
            address:{}
        }
        this.searchAddressTimeout = null
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
    componentDidUpdate(prevProps){
        if(this.props.integrator != prevProps.integrator){
            this.integrator = this.props.integrator;
            this.loadAddress()
        }
    }

    loadAddress(){
        let api = Api;
        let that = this;
        if(!this.integrator){
            return;
        }
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
    searchAddressFromDb(searchKey, searchValue){
        let api = Api;
        let that = this;
        that.setState({
            searchResult:[],
            searching:true
        })
        if(api.setUserToken()){
            let data = {
                search_key:searchKey,
                s:searchValue,
                source:this.source
            }
            api.axios().post('/address/search',data).then(res =>{
                console.log(res)
                that.setState({
                    searching:false,
                    searchResult:res.data.type ? res.data.data.data : []
                })
            }).catch(error => {
                that.setState({
                    searching:false
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
        this.addressChanged = true;
        if(this.props.onChange){
            this.props.onChange(event,this);
        }
        this.setState({
            address:{
                ...address,
                [event.target.name]:event.target.value
            }
        })
        if(this.props.isSearchable && event.target.name == 'address_line_1'){
            clearTimeout(this.searchAddressTimeout);
            let that = this;
            this.searchAddressTimeout = setTimeout(function(){
                that.searchAddressFromDb(event.target.name,event.target.value);
            },200)
            
        }
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
    setAddress(data){
        this.setState({
            address:data
        })
    }
    searchResult(){
        if(this.props.isSearchable != true){
            return <></>
        }
        if(this.state.searchResult.length <=0){
            return <></>
        }
        if(this.state.searching){
            return <Loading/>
        }
        return(
            <div className='address_search_result'>
                {
                    this.state.searchResult.map( (ads,key) => {
                        return (
                            <div className='search_result_dp' key={key} onClick={ e => {this.setAddress(ads); this.setState({searchResult:[]})}}>
                                <strong>{ads.address_line_1}</strong>, {ads.address_city}, {ads.address_state}, {ads.address_country}, {ads.address_zipcode}
                            </div>
                        )
                    })
                }
            </div>
        )
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
        let errors = this.props.errors ? this.props.errors : [];
        return (
            <div className='row'>
                <div className="col-xs-12 col-sm-6 rs_ads_line_1 ">
                    <div className='rs_address_search_col'>
                    <Input disable = {disable} errors ={errors} onChange={this.onAddressChangeHandler.bind(this)}  name="address_line_1" label="Address Line 1" value={address.address_line_1}/>
                    {this.searchResult()}
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 rs_ads_line_2">
                    <Input  disable = {disable}  errors ={errors} onChange={this.onAddressChangeHandler.bind(this)}  name="address_line_2" label="Address Line 2" value={address.address_line_2}/>
                </div>
               
                
                <div className="col-xs-12 col-sm-6 rs_ads_country">
                    <Dropdown  disable = {disable}  errors ={errors} options={countryList} onChange={this.onAddressChangeHandler.bind(this)} name="address_country" label="Country" value={address.address_country}/>
                </div>
                <div className="col-xs-12 col-sm-6 rs_ads_state">
                    <Dropdown  disable = {disable}  errors ={errors} options={stateList} onChange={this.onAddressChangeHandler.bind(this)} name="address_state" label="State" value={address.address_state}/>
                </div>
                <div className="col-xs-12 col-sm-6 rs_ads_city">
                    <Input  disable = {disable}  errors ={errors} onChange={this.onAddressChangeHandler.bind(this)}  name="address_city" label="City" value={address.address_city}/>
                </div>
                <div className="col-xs-12 col-sm-6 rs_ads_zipcode">
                    <Input  disable = {disable}  errors ={errors} onChange={this.onAddressChangeHandler.bind(this)}  name="address_zipcode" label="Zipcode" value={address.address_zipcode}/>
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