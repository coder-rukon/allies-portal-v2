'use client'
import { Component } from "react";
import Button from "@/components/forms/button";
import RsGrid from "@/components/grid/rsgrid";
import Api from "@/inc/Api";
import Loading from "../widget/Loading";
import Helper from "@/inc/Helper";
import Link from "next/link";
import { connect } from 'react-redux';
import ActionsTypes from "@/inc/ActionTypes";
class PropertyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            gridData:[],
            apiData:{},
            hideHeaderItems:[],
        }
        this.gridObj = null;
    }
    componentDidMount(){
        this.loadData();
        this.loadCountry();
        this.loadState();
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
    loadData(){
        let api = Api, that = this;
        this.setState({
            isLoading:true
        })
        api.setUserToken();
        api.axios().get('/property/list?listing_type='+this.props.propertyType).then(res=>{
            that.setState({
                isLoading:false,
                apiData:res.data,
                gridData:res.data.data.data
            })
        })
    }
    getAddress(property){
        
        let address = '';
        if(property.address){
            let state = this.props.locations.state.find( (state) => {  return state.id == property.address.address_state });
            let country = this.props.locations.country.find( (country) => {  return country.id == property.address.address_country });
            address += ( property.address.address_line_1 && Helper.getNullableValue(property.address.address_line_1) ) ? property.address.address_line_1 + ', ' : '';
            address += ( property.address.address_line_2 && Helper.getNullableValue(property.address.address_line_2) ) ? property.address.address_line_2 + ', ' : '';
            address += ( property.address.address_city && Helper.getNullableValue(property.address.address_city) ) ? property.address.address_city + ', ' : '';
            address += (  Helper.getNullableValue(state?.name) ) ? state?.name + ', ' : '';
            //address += (  Helper.getNullableValue(country?.name) ) ? country?.name + ', ' : '';
            //address += ( property.address.address_country && Helper.getNullableValue(property.address.address_country) ) ? property.address.address_country + ', ' : '';
            address += ( property.address.address_zipcode && Helper.getNullableValue(property.address.address_zipcode) ) ? property.address.address_zipcode : '';
        }
        if(!Helper.getNullableValue(address)){
            address = 'No Address';
        }
        if(this.props.onPropertyClick){
            return <div>{address}</div>
        }
        return <Link href={'/property/edit/'+property.property_id}>{address}</Link>;
    }
    getHeaders(){
        let hideHeaderItems = this.state.hideHeaderItems;
        let headers = [
            //{id:'property_id',title:'#',width:'30px',cellRender:(item) => {  return this.props.onPropertyClick ? <div>{"#"+item.property_id}</div> : <Link href={'/property/edit/'+item.property_id}>{"#"+item.property_id}</Link>  }},
            //{id:'type_subtype',title:'Type/Subtype',width:'30px',cellRender:(item) => {  return this.props.onPropertyClick ? <div>{"#"+item.property_id}</div> : <Link href={'/property/edit/'+item.property_id}>{"#"+item.property_id}</Link>  }},
            {id:'property_address',title:'PROPERTY ADDRESS',width:'100px',cellRender:(item) => {  return this.getAddress(item)  },hide:hideHeaderItems.includes('property_address')},
            {id:'property_size',title:'SIZE',width:'100px',hide:hideHeaderItems.includes('property_size')},
            {id:'property_acres',title:'ACRES',width:'100px',hide:hideHeaderItems.includes('property_acres')},
            {id:'property_dock_doors',title:'DOCK DOORS',width:'100px',hide:hideHeaderItems.includes('property_dock_doors')},
            {id:'property_drive_in_doors',title:'DRIVE-IN',width:'100px',hide:hideHeaderItems.includes('property_drive_in')},
            {id:'property_clear_height',title:'CLEAR HEIGHT',width:'100px',hide:hideHeaderItems.includes('property_clear_height')},
            {id:'property_year_built',title:'YEAR BUILT',width:'100px',hide:hideHeaderItems.includes('property_year_built')},
            {id:'property_price',title:'VALUE',width:'100px',hide:hideHeaderItems.includes('property_price')},
            {id:'property_lease_rate',title:'LEASE RATE',width:'100px',hide:hideHeaderItems.includes('property_lease_rate')}
        ];
        return headers;
    }
    onFilterHeaderClickHandler(hItem,event){
        let hideHeaderItemsNew  =  this.state.hideHeaderItems;
        if(hideHeaderItemsNew.includes(hItem.id)){
            hideHeaderItemsNew =  hideHeaderItemsNew.filter( (item) => {
                return item !=hItem.id
            })
        }else{
            hideHeaderItemsNew.push(hItem.id)
        }
        this.setState({
            hideHeaderItems:hideHeaderItemsNew
        })
    }
    onGridRowClick(rowData,headerData){
        if(this.props.onPropertyClick){
            this.props.onPropertyClick(rowData,headerData)
        }
    }
    render() { 
        let gridData = this.state.gridData;
        let gridheader = this.getHeaders();
        let hideHeaderItems = this.state.hideHeaderItems;
        console.log(this.props.locations)
        return ( 
            <div className="property_grid_section">
                <div className="pg_header">
                    <span className="pg_title">{this.props.title} </span>
                    <div>
                        <div className="rs_dropdown">
                            <Button label="View" icon='arrow_drop_down'/>
                            <ul>
                                {
                                    gridheader.map( (headerItem,key) => {
                                        return <li className={ !hideHeaderItems.includes(headerItem.id) ? "checked" : ''} key={key} onClick={this.onFilterHeaderClickHandler.bind(this,headerItem)}><span className="material-symbols-outlined rs_check">done</span> {headerItem.title}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.isLoading ? <div className="text-center"><Loading color={"red"}/></div> : ''}
                
                <RsGrid id={this.props.gridId} onCellClick={this.onGridRowClick.bind(this)} onGridReady={ gridObj => this.gridObj = gridObj } header={gridheader} data={gridData}/>
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
export default connect(mapStateToProps,mapDispatchToProps) (PropertyGrid);