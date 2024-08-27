import Button from '@/components/forms/button';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import AlertMessage from '@/components/widget/AlertMessage';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';
import BorderBox from '../widget/borderbox';

class EditBroker extends Component {
    constructor(props){
        super(props);
        this.state = {
            broker:{},
            errors:{},
            messageType:'text-danger',
            loading:false,
            message:null
        }
    }
    componentDidMount(){
        this.loadBroker()
    }
    loadBroker(){
        let that = this, api = Api;
        that.setState({
            loading:true
        })
        if(api.setUserToken()){
            api.axios().get('/broker/details/1').then(res=>{
                that.setState({
                    loading:false,
                    broker:res.data.data
                })
            })
        }
    }
    onSaveHandler(event){
        let that = this;
        let data = this.state.broker;
        let api = Api;
        if(api.setUserToken()){
            that.setState({
                loading:true
            })
            api.axios().post('/broker/update',data).then(res=>{
                if(res.data.type){
                    that.setState({
                        loading:false,
                        errors:{},
                        broker:{},
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
        let broker = this.state.broker;
        this.setState({
            errors:{},
            message:null,
            broker:{
                ...broker,
                [event.target.name]:event.target.value
            }
        })
    }
    render() {
        let broker = this.state.broker;
        let errors = this.state.errors;

        return (
            <div className='create_user_form'>
                <BorderBox  title="Details">
                    <div className='row'>
                        <Input className="col-sm-6" errors={errors} name="broker_name" label="Broker Name" value={broker.broker_name} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input className="col-sm-6" errors={errors} name="broker_title" label="Title" value={broker.broker_title} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input className="col-sm-6" errors={errors} name="broker_speciality" label="Speciality" value={broker.broker_speciality} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input className="col-sm-6" errors={errors} name="broker_company" label="Company" value={broker.broker_company} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input className="col-sm-6" errors={errors} name="broker_city" label="City" value={broker.broker_city} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input className="col-sm-6" errors={errors} name="broker_email" label="Email" value={broker.broker_email} onChange = {this.onChangeHandler.bind(this)}/>
                        <Input className="col-sm-6" errors={errors} name="broker_phone" label="Phone" value={broker.broker_phone} onChange = {this.onChangeHandler.bind(this)}/>
                        
                    </div>
                    
                    
                </BorderBox>
                {this.state.message ? <div className='mt-3'><AlertMessage message={this.state.message} type={this.state.messageType}/></div> : ''}
                {this.state.loading ? <Loading/> : <Button className="mt-4" label="Save Broker" onClick={this.onSaveHandler.bind(this)}/> }
                
            </div>
        );
    }
}

export default EditBroker;