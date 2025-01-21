"use client"
import React, { Component } from 'react';
import FileUploader from '../widget/FileUploader';
import Dropdown from '../forms/Dropdown';
import Helper from '@/inc/Helper';
import Button from '../forms/button';
import Loading from '../widget/Loading';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import AlertMessage from '../widget/AlertMessage';

class PopupImporter extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            state:null,
            data:{
                prospect_source:null,
                prospect_type:null,
            }
        }
        this.fileUploader = null;
    }
   
    onCancleClick(){
        if(this.props.onCancleClick){
            this.props.onCancleClick()
        }
    }
    onImportHandler(){
       
        let api = Api, that = this;
        if(this.fileUploader && this.fileUploader.hasExportableFile() && api.setUserToken()){
            this.setState({
                isLoading:true
            })
            let file = this.fileUploader.getExportableFiles()[0].file;
            let data = {
                ...this.state.data,
                file: file
            }
            api.axios().post(Settings.apiUrl+'/prospects/import',data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then(res => {
                that.setState({
                    isLoading:false,
                    message:res.data.message	
                })
                that.props.onImportSuccess();
            })
        }
    }
    onDropdownChangeHandler(event,value,name){
        let data = this.state.data;
        this.setState({
            state:null,
            data:{
                ...data,
                [event.target.name]: event.target.value
            }
        })
    }
    isDisableBtn(){
        let data = this.state.data;
        let isDisableImportButton= false;
        if(!data.prospect_type || data.prospect_type == '' || !data.prospect_source || data.prospect_source == ''){
            isDisableImportButton = true;
        }
        return isDisableImportButton;
    }
    render() {
        let ProspectSource= Helper.prospectSource()
        let prospectType= Helper.prospectType()
        return (
            <div className='prospects_import_popup_inner'>
                <h4 className='popup_title'>Import Prospects</h4>
                {typeof document !== 'undefined' ? <FileUploader onReady = { obj => { this.fileUploader = obj } } id="prospects_upload" exportable={true} isSingle={true} maxFileSize={10} extFilter={['csv', 'xlsx', 'xls']} border={true}/> : '' }
                <div className='row'>
                    <div className='col-xs-12 col-sm-6'>
                        <Dropdown onChange={this.onDropdownChangeHandler.bind(this)} options={ProspectSource} label="Prospect Source *" name="prospect_source" />
                    </div>
                    <div className='col-xs-12 col-sm-6'>
                        <Dropdown onChange={this.onDropdownChangeHandler.bind(this)} options={prospectType} label="Prospect Type *" name="prospect_type" />
                    </div>
                </div>
                <div className='popup_footer text-end'>
                    
                    <Button label="Cancel" className="mr-2" onClick = { this.onCancleClick.bind(this)}/>
                    <Button label="Import" onClick={ this.onImportHandler.bind(this)} disable={ this.isDisableBtn() } />
                </div>
                { this.state.message ? <AlertMessage message={this.state.message} type="text-danger"/> : ''}
                {this.state.isLoading ? <div style={{textAlign:'center'}}><Loading/></div> : ''}
            </div>
        );
    }
}

export default PopupImporter;