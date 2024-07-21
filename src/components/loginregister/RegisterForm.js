"use client"
import React, { Component } from 'react';

import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import Api from "@/inc/Api";
import Helper from "@/inc/Helper";
import Settings from "@/inc/Settings";
import Router from 'next/router';
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            message:null,
            user:{
                email:'',
                device_name:'user',
                password: ''
            }
        }
    }
    register(event) {
        let that = this, api = Api;
        that.setState({
            loading:true,
            message:null
        })
        api.axios().post('/register',this.state.user).then(res=>{
            
            that.setState({
                message:res.data.message,
                loading:false
            })
            if(res.data.type){
                Helper.setCookie(Settings.userTokenKey,res.data.data.token,30);
                Router.push('/dashboard');
            }
        }).catch(error=>{
            that.setState({
                loading:false
            })
        })
    }
    onInputChangeHandler(event){
        let user = this.state.user;
        user[event.target.name]= event.target.value;
        this.setState({
            user: user,
            message:null,
        })
    }
    render() { 
        let user = this.state.user;
        let isInline = this.props.inline == true ? true : false;
        return (
            <div className="login_form register_form">
                <h2>Join with us</h2>
                <div className='reg_row'>
                    <div className='reg_col col_6'>
                        <Input name="first_name" label="First name" value={user.first_name} onChange={ this.onInputChangeHandler.bind(this)}/>
                    </div>
                    <div className='reg_col col_6'>
                        <Input name="last_name" label="Last name" value={user.last_name} onChange={ this.onInputChangeHandler.bind(this)}/>
                    </div>
                </div>
                <Input name="email" label={  'User Email'} value={user.email} onChange={ this.onInputChangeHandler.bind(this)}/>
                <Input name="password" type="password" value={user.password} label="Password" onChange={ this.onInputChangeHandler.bind(this)}/>
                <Input name="confirm_password" type="password" value={user.confirm_password} label="Confirm Password" onChange={ this.onInputChangeHandler.bind(this)}/>
                <Button label="Register" icon={this.state.loading ? " ...loading.." : null} onClick={ this.register.bind(this)}/>
                {this.state.message ? <p className="error" style={{color:'red'}} dangerouslySetInnerHTML={{__html:this.state.message}} /> : ''}
            </div>
        );
    }
}
 
export default RegisterForm;