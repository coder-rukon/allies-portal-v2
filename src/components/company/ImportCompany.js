"use client"
import React, { Component } from 'react';
import Button from '../forms/button';
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Loading from '../widget/Loading';
import TeamAccessExportable from './teamaccess/exportable/TeamAccessExportable';
import BorderBox from '../widget/borderbox';

class ImportCompany extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading:false
        }
        this.teamAccessComponent = null;
    }
    uploadFile(){
        let form = new FormData(document.getElementById('company_import'));
        if(this.teamAccessComponent){
            let teamAccessData = this.teamAccessComponent.getData();
            teamAccessData.forEach((value, index) => {
                form.append(`team_access[${index}]`, value.id+'-'+value.role_id);
            });
        }
        
        let api = Api;
        let that = this;
        if(api.setUserToken()){
            that.setState({
                isLoading:true
            })
            api.axios().post('/company/import',form).then(res => {
                if(res.data.type){
                    if(that.props.onImportCompleted){
                        that.props.onImportCompleted()
                    }
                }
                that.setState({
                    isLoading:false
                })
            }).catch(error => {
                that.setState({
                    isLoading:false
                })
            })
        }
    }
    getTeamAccessSection(){
        if(this.props.HideTeamacces){
            return <></>
        }
        return(
            <div className='col-xs-12 col-sm-7'>
                <BorderBox title="Team access">
                    <TeamAccessExportable onReady={ obj => { this.teamAccessComponent = obj }}/>
                </BorderBox>
                
            </div>
        )
    }
    render() {
        if(this.state.isLoading){
            return(
                <div className='import_form'>
                    <Loading/>
                </div>
            )
        }
        return (
            <div className='import_form'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-5'>
                        <BorderBox title="Select xl file">
                            <form id='company_import' method="POST" enctype="multipart/form-data">
                                <Input type="file" name="import_file" label="Please select file"/>
                                
                            </form>
                        </BorderBox>
                    </div>
                    {this.getTeamAccessSection()}
                </div>
                <Button label="Submit for import" className="mt-3" onClick={this.uploadFile.bind(this)} />
                
                
            </div>
        );
    }
}

export default ImportCompany;