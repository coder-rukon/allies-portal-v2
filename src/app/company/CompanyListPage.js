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
import Popup from "@/components/widget/Popup";
import ImportCompany from '@/components/company/ImportCompany'
class CompanyListPage  extends Component {
    constructor(props){
        super(props);
        this.state = {
            showImportForm:false,
            filter:{
                color:null,
            },
            companyList:[],
            hideHeaderItems:['website','industry_name','subindustry_name','company_address','lead_capture_type'],
            isLoading:false
        }
        this.sChangeHandler = null;
    }
    componentDidMount(){
        this.loadCompany();
        this.props.setOptions({title:'Companies'})
    }
    
    loadCompany(s = null){
        this.setState({
            isLoading:true,
            companyList:[]
        })
        let filter = this.state.filter;
        let api = Api;
        let that = this;
        let sUrl = '/company/my-company-list';
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
                    companyList:res.data.data.company.data
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
            that.loadCompany(event.target.value);
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
            {id:'website',title:'Website',width:'100px',hide:hideHeaderItems.includes('website')},
            {id:'industry_name',title:'Industry',width:'100px',hide:hideHeaderItems.includes('industry_name')},
            {id:'subindustry_name',title:'Sub-Industry',width:'100px',hide:hideHeaderItems.includes('subindustry_name')},
            {id:'contact_name',title:'CONTACT NAME',hide:hideHeaderItems.includes('contact_name'),width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_name:''  }},
            {id:'title',title:'TITLE',width:'100px',hide:hideHeaderItems.includes('title'),cellRender:(item) => { return item.company_contact? item.company_contact.contact_title:''  }},
            {id:'phone',title:'PHONE',width:'100px',hide:hideHeaderItems.includes('phone'),cellRender:(item) => { return item.company_contact? item.company_contact.contact_phone:''  }},
            {id:'email',title:'EMAIL',width:'100px',hide:hideHeaderItems.includes('email'),cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'company_address',title:'Address',width:'100px',hide:hideHeaderItems.includes('company_address'),cellRender:(item) => { return this.getAddress(item)  }},
            {id:'lead_capture_type',title:'Lead Capture',width:'100px',hide:hideHeaderItems.includes('lead_capture')},
        ];
        return headers;
    }
    onStarFilterItemClick(color){
        let filter = this.state.filter;
        
        if(filter.color == color.id){
            filter.color = null;
        }else{
            filter.color = color.id;
        }
        this.setState({
            filter:filter
        },()=>{
            this.loadCompany()
        })
    }
    onImportCompleted(event){
        this.loadCompany()
        this.setState({
            showImportForm:false
        })
    }
    showCompanyImportForm(event){
        this.setState({
            showImportForm:true
        })
    }
    onImportSuccess(event){
        this.setState({
            showImportForm:false
        })
    }
    render(){
        let gridheaders = this.getHeaders();
        let gridheader = [
            {
                id:'star',style:{width:'50px'},
                headerCelRender: (hItem,key) => { return <StarIcons onItemClick={ this.onStarFilterItemClick.bind(this)} company={{}}/>; },
                cellRender: (cellData) => {
                    return <StarIcons company={cellData}/>
                }
            },
            
            {
                id:'name',title:'COMPANY NAME',style:{width:'190px'},
                cellRender: (cellData) => {
                    return <div className="item_data"><Link href={'/company/details/'+cellData.company_id}>{cellData.name}</Link></div>
                }
            },
            ...gridheaders
            
        ]
        let gridData =  this.state.companyList;
        let hideHeaderItems = this.state.hideHeaderItems;
        return(
            <div className="company_list_page">
                {
                    this.state.showImportForm ? <Popup onClose={ this.onImportSuccess.bind(this)}> <ImportCompany onImportCompleted={ this.onImportCompleted.bind(this)}/> </Popup> : ''
                }
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
                            <div className="d-flex gap-3">
                            <Button label="+ Add company" href="/company/new-company"/>
                            <Button label="+ Import" onClick={this.showCompanyImportForm.bind(this)}/>
                            </div>
                            
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
export default connect(mapStateToProps,mapDispatchToProps) (CompanyListPage)