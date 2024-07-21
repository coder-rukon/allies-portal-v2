"use client"
import React, { Component } from 'react';

import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import Api from "@/inc/Api";
import Helper from "@/inc/Helper";
import Settings from "@/inc/Settings";
import Router from 'next/router';
class LoginForm extends Component {
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
    login(event) {
        let that = this, api = Api;
        that.setState({
            loading:true,
            message:null
        })
        api.axios().post('/login',this.state.user).then(res=>{
            
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
            <div className="login_form">
                <Input name="email" placeholder={isInline ? 'User Email' : null} label={ !isInline ? 'User Email' : null} value={user.email} onChange={ this.onInputChangeHandler.bind(this)}/>
                <Input name="password" type="password" value={user.password} placeholder= {isInline ? 'Password' : null} label= {!isInline ? 'Password' : null} onChange={ this.onInputChangeHandler.bind(this)}/>
                <Button label="Login" icon={this.state.loading ? " ...loading.." : null} onClick={ this.login.bind(this)}/>
                {this.state.message ? <p className="error" style={{color:'red'}} dangerouslySetInnerHTML={{__html:this.state.message}} /> : ''}
            </div>
        );
    }
}
 
export default LoginForm;