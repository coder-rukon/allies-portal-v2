import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/button';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
import React, { Component } from 'react';

class TeamAccess extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: this.props.access ? false : true,
            access:null,
            email:null,
            isDeleted:false,
            isDeleting:false,
            message:null,
            messageType:false
        }
    }
    componentDidMount(){
        this.setState({
            isEditing: this.props.access?.ca_id ? false : true,
            access: this.props.access
        })
    }
    onEmailChangeHandler(event){
        this.setState({
            email:event.target.value
        })
    }
    roleChangeHnadler(event){
        let access = this.state.access;
        this.setState({
            access:{
                ...access,
                role_id:event.target.value
            }
        })
    }
    onSaveHander(){
        let access = this.state.access;
        
        let api = Api, that= this;
        that.setState({
            saving:true
        })
        api.setUserToken();
        if(access.ca_id){
            let data = {
                role_id: this.state.access.role_id
            }
            api.axios().put('/company-access/update/'+access.ca_id,data).then(res=>{
                if(res.data.type){
                    that.setState({
                        saving:false,
                        isEditing:false,
                        access:res.data.data,
                        message:res.data.message,
                        messageType:true
                    })
                }else{
                    that.setState({
                        message:res.data.message,
                        messageType:false,
                        saving:false
                    })
                }
                
            })
        }else{
            let data = {
                company_id: this.props.company.company_id,
                role_id: this.state.access.role_id,
                user_email: this.state.email
            }
            api.axios().post('/company-access',data).then(res=>{
                if(res.data.type){
                    that.setState({
                        saving:false,
                        isEditing:false,
                        access:res.data.data,
                        message:res.data.message,
                        messageType:true
                    })
                }else{
                    that.setState({
                        saving:false,
                        message:res.data.message,
                        messageType:false
                    })
                }
            })
        }
        
        
    }
    onDeleteHandler(){
        let access = this.state.access;
        
        let api = Api, that= this;
        that.setState({
            isDeleting:true
        })
        api.setUserToken();
        if(access.ca_id){
            api.axios().get('/company-access/delete/'+access.ca_id).then(res=>{
                if(res.data.type){
                    that.setState({
                        isDeleting:false,
                        isDeleted:true,
                        message:res.data.message,
                        messageType:true
                    })
                }else{
                    that.setState({
                        isDeleting:false,
                        message:res.data.message,
                        messageType:false
                    })
                }
            })
        }else{
            that.setState({
                isDeleting:false,
                isDeleted:true,
            })
        }
    }
    getForm(){
        if(!this.state.isEditing){
            return;
        }
        let access = this.state.access;
        let roles = this.props.roles ? this.props.roles : [];
        roles = roles.map( role => {
            return {
                label: role.role_name,
                value: role.company_access_role_id
            }
        })
        return(
            <div className='row access_form'>
                <div className='col-xs-12 col-sm-5'>
                    { access.ca_id ? <span className='acess_user_name'>{access.first_name} {access.last_name}</span> : <Input name="email" value={this.state.email} placeholder="Type member email.." onChange={this.onEmailChangeHandler.bind(this)} />}
                    
                </div>
                <div className='col-xs-12 col-sm-3'>
                    <Dropdown name="role_id" options={roles}  onChange={this.roleChangeHnadler.bind(this)}/>
                </div>
                <div className='col-xs-12 col-sm-4'>
                    <div className='d-flex gap-2 mt-2'>
                        {this.state.saving ? <Loading/> : <Button icon="save" onClick={ this.onSaveHander.bind(this)} /> }
                        {this.state.isDeleting ? <Loading/> : <Button icon="delete" onClick={this.onDeleteHandler.bind(this)} />}
                    </div>
                </div>
            </div>
        )
        
    }
    getView(){
        let access = this.state.access;
        if(this.state.isEditing){
            return;
        }
        
        let name = access?.first_name +' '+access?.last_name;
        let accessLabel =  access?.role_name;
        return(
            <div className='row'>
                <div className='col-xs-12 col-sm-5'>{name}</div>
                <div className='col-xs-12 col-sm-3'>{accessLabel}</div>
                <div className='col-xs-12 col-sm-4'>
                    <div className='d-flex gap-2'>
                        <Button icon="border_color" onClick={ () => { this.setState({isEditing:true})}}/>
                        {this.state.isDeleting ? <Loading/> : <Button icon="delete" onClick={this.onDeleteHandler.bind(this)} />}
                    </div>
                </div>
            </div>
        )
    }
    render() {
        if(this.state.isDeleted){
            return <></>
        }
        let access = this.state.access;
        if(!access){
            return(<></>)
        }
        return (
            <div className='team_access_item'>
                {this.getView()}
                {this.getForm()}
                {this.state.message ? <p dangerouslySetInnerHTML={{__html:this.state.message}} style={{color:this.state.messageType ? "green" : 'red'}}></p> : '' }
            </div>
        );
    }
}

export default TeamAccess;