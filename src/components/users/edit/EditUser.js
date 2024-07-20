import Button from '@/components/forms/button';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import AlertMessage from '@/components/widget/AlertMessage';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';

class EditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{},
            errors:{},
            messageType:'text-danger',
            loading:false,
            message:null
        }
    }
    componentDidMount(){
        this.loadUser()
    }
    loadUser(){
        let userId =  this.props.user_id;
        if(!userId){
            return;
        }

        let that = this, api = Api;
        if(api.setUserToken()){
            api.axios().get('/user/get/'+userId).then(res => {
                if(res.data.type){
                    that.setState({
                        user:res.data.data
                    })
                }
            })
        }
        
    }
    onSaveHandler(event){
        let that = this;
        let data = this.state.user;
        let api = Api;
        let userId =  this.props.user_id;
        if(api.setUserToken()){
            that.setState({
                loading:true
            })
            api.axios().post('/user/update/'+userId,data).then(res=>{
                if(res.data.type){
                    that.setState({
                        loading:false,
                        errors:{},
                        user: res.data.data,
                        messageType:'text-success',
                        message:res.data.message
                    })
                }else{
                    that.setState({
                        loading:false,
                        messageType:'text-danger',
                        errors:res.data.errors,
                        message: res.data.message
                    })
                }
                
            }).catch(error=>{
                that.setState({
                    loading:false
                })
            })
        }

    }
    onChangeHandler(event){
        let user = this.state.user;
        this.setState({
            errors:{},
            message:null,
            user:{
                ...user,
                [event.target.name]:event.target.value
            }
        })
    }
    render() {
        let userRoles = Settings.getUserSystemRoles()
        let userStatus = Settings.getUserStatus()
        let user = this.state.user;
        let errors = this.state.errors;

        return (
            <div className='create_user_form'>
               
                <div className='row'>
                    <Input className="col-sm-6" errors={errors} name="first_name" label="Frist Name*" value={user.first_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input className="col-sm-6"  errors={errors} name="last_name" label="Last Name*"  value={user.last_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input className="col-sm-12"  errors={errors} name="email" label="Email*" value={user.email} onChange = {this.onChangeHandler.bind(this)} />
                    
                    <Dropdown options={userRoles}  errors={errors} label="System Role*" name="user_role" className="col-sm-12"  value={user.user_role} onChange = {this.onChangeHandler.bind(this)} />
                    <Dropdown options={userStatus}  errors={errors} label="Status*" name="status" className="col-sm-12"  value={user.status} onChange = {this.onChangeHandler.bind(this)} />
                    <Input className="col-sm-12"  errors={errors} name="password" label="Password*" type="password"  value={user.password} onChange = {this.onChangeHandler.bind(this)} />
                    <Input className="col-sm-12"  errors={errors} name="confirm_password" label="Confirm password*" type="password"  value={user.confirm_password} onChange = {this.onChangeHandler.bind(this)} />
                </div>
                {this.state.loading ? <Loading/> : <Button label="Save" onClick={this.onSaveHandler.bind(this)}/> }
                {this.state.message ? <AlertMessage message={this.state.message} type={this.state.messageType}/> : ''}
                
            </div>
        );
    }
}

export default EditUser;