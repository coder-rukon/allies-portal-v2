import React, { Component } from 'react';
import Popup from '../widget/Popup';
import AlertMessage from '@/components/widget/AlertMessage';
import Loading from '../widget/Loading';
import Button from '../forms/button';
import FileUploader from '../widget/FileUploader';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import Helper from '@/inc/Helper';
class BrokerImporter extends Component {
    constructor(props){
        super(props);
        this.state = {
            message:null,
            isLoading:false
        }
        this.fileUploader = null;
    }
    onClosePopup(){
        if(this.props.onClose){
            this.props.onClose()
        }
    }
    onImportHandler() {
        if(this.state.isLoading){
            return;
        }
        let api = Api, that = this;
        if(this.fileUploader && this.fileUploader.hasExportableFile() && api.setUserToken()){
            this.setState({
                isLoading:true
            })
            let file = this.fileUploader.getExportableFiles()[0].file;
            let data = {
                file: file
            }
            api.axios().post(Settings.apiUrl+'/broker/import',data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then(res => {
                Helper.alert(res.data.message,{className:res.data.type ? 'success': 'error'})
                that.setState({
                    isLoading:false,
                    message:res.data.message	
                })
                if(res.data.type){
                    that.onClosePopup();
                }
                
            })
        }
    }
    isDisableBtn(){
        return this.state.isLoading ? true :false;
    }
    render() {
        return (
            <Popup isCenter={true} width={"500px"} onClose={ this.onClosePopup.bind(this)}>
                <div className='broker_importer'>
                    <h4 className='popup_title'>Import Brokers</h4>
                    <FileUploader onReady = { obj => { this.fileUploader = obj } } id="import_broker" exportable={true} isSingle={true} maxFileSize={10} extFilter={['csv', 'xlsx', 'xls']} border={true}/>
                    <div className='popup_footer text-end'>
                        
                        <Button label="Cancel" className="mr-2" onClick = { this.onClosePopup.bind(this)}/>
                        <Button label="Import" onClick={ this.onImportHandler.bind(this)} disable={ this.isDisableBtn() } />
                    </div>
                    { this.state.message ? <AlertMessage message={this.state.message} type="text-danger"/> : ''}
                    {this.state.isLoading ? <div style={{textAlign:'center'}}><Loading/></div> : ''}
                </div>
            </Popup>
            
        );
    }
}

export default BrokerImporter;