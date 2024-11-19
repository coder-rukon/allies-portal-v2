import React, { Component } from 'react';
import RsGrid from '../grid/rsgrid';
import Panel from '../widget/panel';
import Input from '../forms/Input';
import Popup from '../widget/Popup';
import PopupImporter from './PopupImporter';
import Button from '../forms/button';
import Helper from '@/inc/Helper';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import Loading from '../widget/Loading';
import StarIcons from '../company/StarIcons';
import Dropdown from '../forms/Dropdown';
import ConfirmPopup from '@/components/widget/ConfirmPopup'
class Prospects extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedProspect:null,
            filter:{
                color:null
            },
            isLoading:false,
            isArchive:false,
            hideHeaderItems:[],
            showImportForm:false,
            nextActionType:null,
            nextActionDoing:false,
            showDeletePopup:false,
            isDeleting:false,
            prospects:[]
        }
        this.s = null;
        this.grid  = null;
    }
    componentDidMount(){
        Helper.setPageData({
            title:'Prospects',
            pageTitle:'Prospects'
        })
        this.loadProspects();
    }
    loadProspects(){
        let that = this, api = Api;
        if(api.setUserToken()){
            this.setState({
                isLoading:true
            })
            let data = {
                ...this.state.filter,
                s:this.s,
                status: this.state.isArchive ? "archive" : null
            }

            api.axios().post(Settings.apiUrl+'/prospects/all',data).then(res => {
                that.setState({
                    isLoading:false,
                    prospects:res.data.data.data
                })
            })
        }
        
    }
    resetSelections(){
        let that = this;
        this.setState({
            selectedProspect:null,
            nextActionType:null,
            nextActionDoing:false,
        },function(){
            if(that.grid){
                that.grid.refresh()
            }
        })
        
    }
    onDeleteBtnClick(){
        this.setState({
            showDeletePopup:true
        })
    }
    onDeleteHanlder(){
        let selected_prospect = this.state.selectedProspect;
        let api = Api, that = this;
        if(!api.setUserToken()){
            return;
        }
        this.setState({
            isDeleting:true
        })
        let data = {
            prospect_id: selected_prospect.id,
        }
        api.axios().post('/prospects/delete',data).then(res=>{
            that.setState({
                isDeleting:false,
                showDeletePopup:false
            })
            if(!res.data.type){
                Helper.alert(res.data.message,{
                    className:'error'
                })
            }else{
                that.resetSelections();
                that.loadProspects();
                Helper.alert(res.data.message)
            }
        })

    }
    onNextClickHandler(){
        if(this.state.nextActionType){
            //return;
        }
        this.setState({
            nextActionDoing:true
        })
        let nextActionType = this.state.nextActionType;
        let selected_prospect = this.state.selectedProspect;
        let api = Api, that = this;
        if(!api.setUserToken()){
            return;
        }
        if(nextActionType == 'not_interested'){
            let data = {
                prospect_id: selected_prospect.id,
                not_interested_reason: document.getElementById('not_interested_reason').value,
                not_interested_reason_text:  Helper.prospectsNoInterestedReason(document.getElementById('not_interested_reason').value)?.label,
            }
            api.axios().post('/prospects/send-archive',data).then(res=>{
                that.setState({
                    nextActionDoing:false
                })
                if(!res.data.type){
                    let errors = Object.values(res.data.errors);
                    errors.forEach( message => {
                        Helper.alert(message[0],{
                            className:'error'
                        })
                    })
                    
                }else{
                    that.resetSelections();
                    that.loadProspects();
                    Helper.alert(res.data.message)
                }
            })
            
        }
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
            {id:'created_at',title:'Imported Date',width:'100px',hide:hideHeaderItems.includes('created_at'),cellRender:(data) => { return <div className='item_data'>{Helper.formateDate(data.created_at)}</div>  }},
        ];
        if(this.state.isArchive){
            headers.push(
                {id:'archive_reason',title:'Archive reason',hide:hideHeaderItems.includes('archive_reason'),cellRender:(data) => { return <div className='item_data'>{ JSON.parse(data.data)?.archive_reason_text }</div>  }});
        }
        return headers;
    }
    onSearchChangeHandler(){

    }
    
    onImportSuccess(){
        this.setState({
            showImportForm:false
        })
        this.loadProspects()
    }
    showCompanyImportForm(event){
        this.setState({
            showImportForm:true
        })
    }
    loadItemsByStatus(status){
        this.setState({isArchive:status == 'archive' ? true : false},e => {
            this.loadProspects();
        })
    }
    onGridItemClickHandler(itemData){
        let selectedProspect = this.state.selectedProspect;
        if(selectedProspect && selectedProspect.id == itemData.id){
            this.setState({
                selectedProspect:null
            })
        }else{
            this.setState({
                selectedProspect:itemData
            })
        }
        
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
            this.loadProspects()
        })
    }
    isDisbaleCommonBtns(){
        let disable = this.state.selectedProspect == null ? true : false;
        if(this.state.nextActionType == 'not_interested'){
            disable = true;
        }
        return disable;
    }
    onCommonActionBtnClickHandler(value){
        let currentActionType = this.state.nextActionType;
        if(currentActionType == value){
            this.setState({nextActionType:null})
        }else{
            this.setState({nextActionType:value})
        }
    }
    onDeleteClose(){
        this.setState({
            showDeletePopup:false
        })
    }
    render() {
        let gridheaders = [
            {
                id:'star',style:{width:'50px'},
                headerCelRender: (hItem,key) => { return <StarIcons onItemClick={ this.onStarFilterItemClick.bind(this)} company={{}}/>; },
                cellRender: (cellData) => {
                    return <StarIcons apiUrl= {Settings.apiUrl + '/prospects/update-color'} company={cellData}/>
                }
            },
            ...this.getHeaders()
        ];
        let notInterestedReason = Helper.prospectsNoInterestedReason();
        let gridData = this.state.prospects;
        let hideHeaderItems = this.state.hideHeaderItems;
        let isDisbaleCommonBtns = this.isDisbaleCommonBtns();
        return (
            <div className='prospects_archive'>
                 {
                    this.state.showImportForm ? <Popup isCenter={true} width={"500px"} onClose={ this.onImportSuccess.bind(this)}> <PopupImporter onCancleClick={this.onImportSuccess.bind(this)} onImportSuccess={this.onImportSuccess.bind(this)}  /> </Popup> : ''
                }
                {
                    this.state.showDeletePopup ? <ConfirmPopup isLoading={this.state.isDeleting} onYes={this.onDeleteHanlder.bind(this)} confirm_title={"Do you want to delete?"} onClose={ this.onDeleteClose.bind(this)}/>: ''
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
                                { !this.state.isArchive ? <Button label="Archive" onClick={ this.loadItemsByStatus.bind(this,'archive') }/> : <Button label="Back" onClick={  this.loadItemsByStatus.bind(this,'active') }/>}
                                <Button label="+ Import" onClick={this.showCompanyImportForm.bind(this)}/>
                            </div>
                            
                        </div>
                    </div>
                    <RsGrid onGridReady={ grid => { this.grid = grid}} enableRowSelect="single" onRowClick = { this.onGridItemClickHandler.bind(this)} header={gridheaders} data={gridData}/>
                    <div className='prospect_list_footer'>
                        <div className='left_items'>
                            <Button 
                                label="Interested" 
                                disable={isDisbaleCommonBtns} 
                                className={this.state.nextActionType == 'interested' ? '' : "bordered"} // active status
                                isActive={true}
                                onClick= { e => { this.onCommonActionBtnClickHandler('interested')}}
                            />
                            <Button 
                                label="No Answer" 
                                disable={isDisbaleCommonBtns}
                                className={this.state.nextActionType == 'no_answer' ? '' : "bordered"} // active status
                                onClick= { e => { this.onCommonActionBtnClickHandler('no_answer')}}
                            />
                            <Button 
                                label="Not Interested" 
                                disable={this.state.selectedProspect == null ? true : false} 
                                className={this.state.nextActionType == 'not_interested' ? '' : "bordered"} // active status
                                onClick= { e => { this.onCommonActionBtnClickHandler('not_interested')}}
                            />
                            <Dropdown 
                                options={notInterestedReason} 
                                disable={this.state.nextActionType == 'not_interested' ? false : true}
                                id="not_interested_reason"
                                className="bordered"
                            />
                             <Button 
                                disable={this.state.selectedProspect == null ? true : false}
                                className={ "btn_danger"} // active status
                                onClick= { this.onDeleteBtnClick.bind(this) }
                                beforeIcon="delete"
                            />
                            
                        </div>
                        <div>
                            {this.state.nextActionDoing ? <Loading/> : <Button label="Next" onClick={this.onNextClickHandler.bind(this)} disable={this.state.nextActionType == null ? true : false}/>}
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