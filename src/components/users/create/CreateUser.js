import Button from '@/components/forms/button';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import AlertMessage from '@/components/widget/AlertMessage';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
import React, { Component } from 'react';

class CreateUser extends Component {
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
    onSaveHandler(event){
        let that = this;
        let data = this.state.user;
        let api = Api;
        if(api.setUserToken()){
            that.setState({
                loading:true
            })
            api.axios().post('/user/create',data).then(res=>{
                if(res.data.type){
                    that.setState({
                        loading:false,
                        errors:{},
                        user:{
                            first_name :'',
                            last_name :'',
                            email :'',
                            status :'',
                            user_role :'',
                            password :'',
                            confirm_password :'',
                        },
                        messageType:'text-success',
                        message:res.data.message
                    })
                }else{
                    that.setState({
                        loading:false,
                        messageType:'text-danger',
                        errors:res.data.errors,
                        message:""
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
        let userRoles = [
            {label:'Broker',vaue:'broker'},
            {label:'Administrator',vaue:'administrator'}
        ]
        let userStatus = [
            {label:'Active',vaue:'active'},
            {label:'Pending Review',vaue:'pending_review'}
        ]
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

export default CreateUser;