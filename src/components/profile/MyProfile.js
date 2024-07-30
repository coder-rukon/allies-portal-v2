"use client"
import Button from '@/components/forms/button';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import AlertMessage from '@/components/widget/AlertMessage';
import Loading from '@/components/widget/Loading';
import ActionsTypes from '@/inc/ActionTypes';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyProfile extends Component {
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
        let that = this, api = Api; 
        that.setState({
            loading:true
        })
        if(api.setUserToken()){
            api.axios().get('/me').then(res => {
                that.setState({
                    loading:false,
                    user:res.data.data.user
                })
                
            })
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
            api.axios().post('my-account/update',data).then(res=>{
                if(res.data.type){
                    that.setState({
                        loading:false,
                        errors:{},
                        user: res.data.data,
                        messageType:'text-success',
                        message:res.data.message
                    })
                    that.props.setUser(res.data.data)
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
        let user = this.state.user;
        let errors = this.state.errors;

        return (
            <div className='create_user_form'>
               
                <div className='row'>
                    <Input className="col-sm-6" errors={errors} name="first_name" label="Frist Name*" value={user.first_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input className="col-sm-6"  errors={errors} name="last_name" label="Last Name*"  value={user.last_name} onChange = {this.onChangeHandler.bind(this)}/>
                    <Input className="col-sm-12"  errors={errors} name="email" label="Email*" value={user.email} onChange = {this.onChangeHandler.bind(this)} />
                    
                    <Input className="col-sm-12"  errors={errors} name="password" label="Password*" type="password"  value={user.password} onChange = {this.onChangeHandler.bind(this)} />
                    <Input className="col-sm-12"  errors={errors} name="confirm_password" label="Confirm password*" type="password"  value={user.confirm_password} onChange = {this.onChangeHandler.bind(this)} />
                </div>

                {this.state.loading ? <Loading/> : <Button label="Save" onClick={this.onSaveHandler.bind(this)}/> }
                {this.state.message ? <AlertMessage message={this.state.message} type={this.state.messageType}/> : ''}
                
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});
const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => { dispatch({type:ActionsTypes.SET_USER,user:user})}
    //setState: (data) => dispatch({type:ActionsTypes.SET_LOCATION_STATE,data:data}), // Map your state to props
});

export default connect(mapStateToProps,mapDispatchToProps) (MyProfile)