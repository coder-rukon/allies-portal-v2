"use client"
import Api from '@/inc/Api';
import Loading from '../widget/Loading';
import React, { Component } from 'react';
import { redirect } from 'next/navigation';
import './authwraper.css';
import { Provider } from 'react-redux';
import Store from '@/inc/Store';
class AuthWraper extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiCalled: false,
            user:null
        }
    }
    componentDidMount(){
        this.retriveAccount();
    }
    retriveAccount(){
        let that = this, api = Api;
        api.setUserToken();
        api.axios().get('/me').then(res=>{
            that.setState({
                apiCalled:true,
                user:res.data.type ? res.data.data.user : null
            })
        }).catch(error => {
            that.setState({
                apiCalled:true,
                user: null
            })
        })
    }
    render() {
        if(!this.state.apiCalled){
            return(
                <div className='app_init_state_wraper'>
                    <div>
                        <img className='logo' src="/allies-dark-logo.png" alt="Allies logo"/>
                        <div className="loader"></div> 
                    </div>
                    
                </div>
            )
        }
        if(!this.state.user){
            redirect('/login')
        }
        return (
            <Provider store={Store}>
                {this.props.children}
            </Provider>
        );
    }
}

export default AuthWraper;