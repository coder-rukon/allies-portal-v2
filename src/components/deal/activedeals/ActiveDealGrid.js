'use client'
import { Component } from "react";
import Button from "@/components/forms/button";
import RsGrid from "@/components/grid/rsgrid";
import Api from "@/inc/Api";
import Loading from "../../widget/Loading";
import Helper from "@/inc/Helper";
import Link from "next/link";
class ActiveDealGrid extends Component {
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
    }
    loadData(){
        let api = Api, that = this;
        this.setState({
            isLoading:true
        })
        let propType = this.props.propertyType;

        let data = {
            is_active:'yes',
            landlord_rep: propType == 'sr_lr' ? 'yes' : 'no',
            seller_rep: propType == 'sr_lr' ? 'yes' : 'no',
            tenant_rep: propType == 'br_tr' ? 'yes' : 'no',
            buyer_rep: propType == 'br_tr' ? 'yes' : 'no'
        }
        if(Helper.getNullableValue(this.props.search)){
            data.search = this.props.search;
        }
        api.setUserToken();
        api.axios().post('/deal/active-deals',data).then(res=>{
            console.log(res)
            that.setState({
                isLoading:false,
                apiData:res.data,
                gridData:res.data.data.deal.data
            })
        })
    }
    getAddress(property){
        let address = '';
        if(property.address){
            address += ( property.address.address_line_1 && Helper.getNullableValue(property.address.address_line_1) ) ? property.address.address_line_1 + ', ' : '';
            address += ( property.address.address_line_2 && Helper.getNullableValue(property.address.address_line_2) ) ? property.address.address_line_2 + ', ' : '';
            address += ( property.address.address_city && Helper.getNullableValue(property.address.address_city) ) ? property.address.address_city + ', ' : '';
            address += ( property.address.address_state && Helper.getNullableValue(property.address.address_state) ) ? property.address.address_state + ', ' : '';
            address += ( property.address.address_country && Helper.getNullableValue(property.address.address_country) ) ? property.address.address_country + ', ' : '';
            address += ( property.address.address_zipcode && Helper.getNullableValue(property.address.address_zipcode) ) ? property.address.address_zipcode : '';
        }
        if(this.props.onPropertyClick){
            return <div>{address}</div>
        }
        return <Link href={'/deal/details/'+property.deal_id}>{address}</Link>;
    }
    getHeaders(){
        let hideHeaderItems = this.state.hideHeaderItems;
        let headers = [
            {id:'deal_id',title:'#',width:'30px',cellRender:(item) => {  return this.props.onPropertyClick ? <div>{"#"+item.deal_id}</div> : <Link href={'/deals/edit/'+item.deal_id}>{"#"+item.deal_id}</Link>  }},
            //{id:'deal_name',title:'DEAL NAME',width:'100px',cellRender:(item) => {  return this.getAddress(item)  },hide:hideHeaderItems.includes('property_address')},
            {id:'deal_name',title:'DEAL NAME',width:'100px',hide:hideHeaderItems.includes('deal_name')},
            {id:'deal_budget',title:'BUDGET',width:'100px',hide:hideHeaderItems.includes('deal_budget')},
            {id:'deal_building_sf',title:'BUILDING SF',width:'100px',hide:hideHeaderItems.includes('deal_building_sf')},
            {id:'deal_property_size',title:'SIZE',width:'100px',hide:hideHeaderItems.includes('property_size')},
            {id:'deal_property_zoning',title:'ZONING',width:'100px',hide:hideHeaderItems.includes('deal_property_zoning')},
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
        return ( 
            <div id={"ag_section_"+this.props.gridId} className="property_grid_section active_deal_grid">
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
 
export default ActiveDealGrid;