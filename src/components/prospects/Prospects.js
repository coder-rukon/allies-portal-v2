import React, { Component } from 'react';
import RsGrid from '../grid/rsgrid';
import Panel from '../widget/panel';
import Input from '../forms/Input';
import Popup from '../widget/Popup';
import PopupImporter from './PopupImporter';
import Button from '../forms/button';
import Helper from '@/inc/Helper';

class Prospects extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            hideHeaderItems:[],
            showImportForm:false,
            prospects:[]
        }
    }
    componentDidMount(){
        Helper.setPageData({
            title:'Prospects',
            pageTitle:'Prospects'
        })
        this.setState({
            prospects:[
                {contact_name:'Jamie Doe',company_name:'First Holdings'},
                {contact_name:'Bill Smith',company_name:'2 Towers Inc.'},
                {contact_name:'John Smith',company_name:'Tech Corp Ltd.'},
                {contact_name:'Emily Johnson',company_name:'Global Solutions Inc.'},
                {contact_name:'Michael Brown',company_name:'InnovateX Industries'},
                {contact_name:'Sarah Wilson',company_name:'Elite Services Group'},
                {contact_name:'David Lee',company_name:'OmniTech Solutions'}
            ]
        })
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
    getHeaders(){
        let hideHeaderItems = this.state.hideHeaderItems;
        
        let headers = [
            {id:'contact_name',title:'CONTACT NAME',width:'100px',hide:hideHeaderItems.includes('contact_name')},
            {id:'company_name',title:'COMPANY NAME',width:'100px',hide:hideHeaderItems.includes('company_name')},
            {id:'title',title:'TITLE',width:'100px',hide:hideHeaderItems.includes('title')},
            {id:'phone',title:'PHONE',width:'100px',hide:hideHeaderItems.includes('phone')},
            {id:'email',title:'EMAIL',width:'100px',hide:hideHeaderItems.includes('email')},
            {id:'created_at',title:'Imported Date',width:'100px',hide:hideHeaderItems.includes('created_at')},
        ];
        return headers;
    }
    onSearchChangeHandler(){

    }
    onImportCompleted(event){
        this.loadCompany()
        this.setState({
            showImportForm:false
        })
    }
    onImportSuccess(){
        this.setState({
            showImportForm:false
        })
    }
    showCompanyImportForm(event){
        this.setState({
            showImportForm:true
        })
    }
    render() {
        let gridheaders = this.getHeaders();
        let gridData = this.state.prospects;
        let hideHeaderItems = this.state.hideHeaderItems;
        return (
            <div className='prospects_archive'>
                 {
                    this.state.showImportForm ? <Popup isCenter={true} width={"500px"} onClose={ this.onImportSuccess.bind(this)}> <PopupImporter onImportCompleted={ this.onImportCompleted.bind(this)}/> </Popup> : ''
                }
                <Panel title="Prospects">
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
                                <Button label="+ Import" onClick={this.showCompanyImportForm.bind(this)}/>
                            </div>
                            
                        </div>
                    </div>
                    <RsGrid header={gridheaders} data={gridData}/>
                    <div className='prospect_list_footer'>
                        <div>
                            <Button label="Interested" className="bordered mr-3"/>
                            <Button label="Not Interested" className="bordered"/>
                        </div>
                        <div>
                            <Button label="Next" disable={true}/>
                        </div>
                    </div>
                    <div className="mt-2 mb-2 text-center">
                       {this.state.isLoading ? <Loading/> : '' }
                    </div>
                </Panel>

                
            </div>
        );
    }
}

export default Prospects;