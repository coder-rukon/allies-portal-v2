"use client"
import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
import Loading from "@/components/widget/Loading";
import Panel from "@/components/widget/panel";
import ActionsTypes from "@/inc/ActionTypes";
import Api from "@/inc/Api";
import Link from "next/link";
import { Component } from "react";
import { connect } from "react-redux";
import StarIcons from '@/components/company/StarIcons'
import Helper from "@/inc/Helper";
class BrokerListPage  extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter:{
                color:null,
            },
            brokerList:[],
            hideHeaderItems:[],
            isLoading:false
        }
        this.sChangeHandler = null;
    }
    componentDidMount(){
        this.loadBroker();
        Helper.setPageData({
            pageTitle:'Brokers',
            title:'Brokers'
        })
    }
    
    loadBroker(s = null){
        this.setState({
            isLoading:true,
            brokerList:[]
        })
        let filter = this.state.filter;
        let api = Api;
        let that = this;
        let sUrl = '/broker/all';
        let params = {
            ...filter
        };
        if(s){
            params.s = s;
        }
        if(api.setUserToken()){
            api.axios().get(sUrl,{params:params}).then(res => {
                that.setState({
                    isLoading:false,
                    brokerList:res.data.data.data
                })
            }).catch(error => {
                that.setState({
                    isLoading:false
                })
            })
        }
    }
    onSearchChangeHandler(event){
        let that = this;
        clearTimeout(this.sChangeHandler);
        this.sChangeHandler = setTimeout(function(){
            that.loadBroker(event.target.value);
        },300);
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
    getAddress(company){
        let address = '';
        if(company.company_address){
            address += ( company.company_address.address_line_1 && Helper.getNullableValue(company.company_address.address_line_1) ) ? company.company_address.address_line_1 + ', ' : '';
            address += ( company.company_address.address_line_2 && Helper.getNullableValue(company.company_address.address_line_2) ) ? company.company_address.address_line_2 + ', ' : '';
            address += ( company.company_address.address_city && Helper.getNullableValue(company.company_address.address_city) ) ? company.company_address.address_city + ', ' : '';
            address += ( company.company_address.address_state && Helper.getNullableValue(company.company_address.address_state) ) ? company.company_address.address_state + ', ' : '';
            address += ( company.company_address.address_country && Helper.getNullableValue(company.company_address.address_country) ) ? company.company_address.address_country + ', ' : '';
            address += ( company.company_address.address_zipcode && Helper.getNullableValue(company.company_address.address_zipcode) ) ? company.company_address.address_zipcode : '';
        }
        return address;
    }
    getHeaders(){
        let hideHeaderItems = this.state.hideHeaderItems;
        
        let headers = [
            {id:'broker_name',title:'BROKER NAME',width:'100px',cellRender: (data) => { return<Link href={'/broker/edit/'+data.broker_id}>{data.broker_name}</Link>},hide:hideHeaderItems.includes('broker_name')},
            {id:'broker_company',title:'COMPANY NAME',width:'100px',hide:hideHeaderItems.includes('broker_company')},
            {id:'broker_title',title:'TITLE',width:'100px',hide:hideHeaderItems.includes('broker_title')},
            {id:'broker_phone',title:'PHONE',width:'100px',hide:hideHeaderItems.includes('broker_phone')},
            {id:'broker_email',title:'EMAIL',width:'100px',hide:hideHeaderItems.includes('broker_email')}
        ];
        return headers;
    }
    render(){
        let gridheaders = this.getHeaders();
        let gridheader = [
            ...gridheaders
        ]
        let gridData =  this.state.brokerList;
        let hideHeaderItems = this.state.hideHeaderItems;
        return(
            <div className="company_list_page">
                <Panel>
                    <div className="filter_and_search">
                        <div className="left_side">
                            <div className="form_s">
                                <Input name="search" placeholder="Search company, name, etc." onChange={ this.onSearchChangeHandler.bind(this) }/>
                            </div>
                            <div>
                                <div className="rs_dropdown">
                                    <Button label="View" icon='arrow_drop_down'/>
                                    <ul>
                                        {
                                            gridheaders.map( (headerItem,key) => {
                                                return <li className={ !hideHeaderItems.includes(headerItem.id) ? "checked" : ''} key={key} onClick={this.onFilterHeaderClickHandler.bind(this,headerItem)}><span className="material-symbols-outlined rs_check">done</span> {headerItem.title}</li>
                                            })
                                        }
                                        
                                    </ul>
                                </div>
                            </div>
                            
    
                        </div>
                        <div className="right_side">
                            <Button label="+ Add broker" href="/broker/new"/>
                        </div>
                    </div>
                    <RsGrid header={gridheader} data={gridData}/>
                    <div className="mt-2 mb-2 text-center">
                       {this.state.isLoading ? <Loading/> : '' }
                    </div>
                </Panel>
                
            </div>
        ) 
    }
    
}
const mapStateToProps = (state) => {
    return {
        companyAccess: state.companyAccess
    }
};
const mapDispatchToProps = (dispatch) => ({
    setCompanyAcess:(data) => { dispatch({type:ActionsTypes.SET_COMPANY_ACCESS,data:data})},
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});
export default connect(mapStateToProps,mapDispatchToProps) (BrokerListPage)