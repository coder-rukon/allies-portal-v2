import Button from '@/components/forms/button';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import AlertMessage from '@/components/widget/AlertMessage';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';
import BorderBox from '../widget/borderbox';
import { connect } from 'react-redux';
import { redirect } from 'next/navigation';
import Helper from '@/inc/Helper';
class EditBroker extends Component {
    constructor(props){
        super(props);
        this.state = {
            broker:{},
            errors:{},
            messageType:'text-danger',
            loading:false,
            isDisable:true,
            message:null
        }
    }
    componentDidMount(){
        this.loadBroker()
    }
    loadBroker(){
        if(!this.props.broker_id){
            return;
        }
        let that = this, api = Api;
        that.setState({
            loading:true
        })
        if(api.setUserToken()){
            api.axios().get('/broker/details/'+this.props.broker_id).then(res=>{
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
                        messageType:'text-success',
                        message:res.data.message,
                        isDisable:true
                    })
                }else{
                    that.setState({
                        loading:false,
                        messageType:'text-danger',
                        errors:res.data.errors,
                        message:res.data.message
                    })
                }
                
            }).catch(error=>{
                that.setState({
                    loading:false
                })
            })
        }

    }
    deleteHandler(){
        let that = this;
        let data = this.state.broker;
        let api = Api;
        if(api.setUserToken()){
            that.setState({
                loading:true
            })
            api.axios().get('/broker/delete/'+ data.broker_id).then(res=>{
                if(res.data.type){
                    that.setState({
                        loading:false,
                        errors:{},
                        messageType:'text-success',
                        message:res.data.message,
                        isDisable:true,
                        redirectTo:'/broker'
                    })
                    Helper.alert(res.data.message,{className:'success'});
                }else{
                    that.setState({
                        loading:false,
                        messageType:'text-danger',
                        errors:res.data.errors,
                        message:res.data.message
                    })
                    Helper.alert(res.data.message,{className:'error'});
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
    onEditIconClick(event){
        this.setState({
            isDisable:false
        })
    }

    render() {
        let broker = this.state.broker;
        let errors = this.state.errors;
        let isDisable = this.state.isDisable;
        let user = this.props.auth.user;
        if(this.state.redirectTo){
            redirect(this.state.redirectTo)
        }
        return (
            <div className='create_user_form'>
                <div className="pannel_header">
                    <div></div>
                    <div>
                        <Button className="danger md mr-2"  onClick={ this.deleteHandler.bind(this) } icon="delete"/>
                        {
                            !isDisable ? 
                            <Button onClick={ this.onSaveHandler.bind(this) }  className="md" beforeIcon="save" label= {"Save"}/>
                            :
                            <Button  onClick={ this.onEditIconClick.bind(this) } className="md" beforeIcon="border_color" label= {"Edit"}/>

                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-8 col-md-6'>
                        <BorderBox className={isDisable  ? "input_box_margin_fix" : ''}  title="Details">
                            
                            {this.state.loading ? <Loading/> : ''}

                            {this.state.message ? <div className='mt-3 mb-3'><AlertMessage message={this.state.message} type={this.state.messageType}/></div> : ''}

                            <div className='row'>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_name" label="Broker Name" value={broker.broker_name} onChange = {this.onChangeHandler.bind(this)}/>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_title" label="Title" value={broker.broker_title} onChange = {this.onChangeHandler.bind(this)}/>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_speciality" label="Speciality" value={broker.broker_speciality} onChange = {this.onChangeHandler.bind(this)}/>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_company" label="Company" value={broker.broker_company} onChange = {this.onChangeHandler.bind(this)}/>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_city" label="City" value={broker.broker_city} onChange = {this.onChangeHandler.bind(this)}/>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_email" label="Email" value={broker.broker_email} onChange = {this.onChangeHandler.bind(this)}/>
                                <Input disable={isDisable} className="col-sm-6" errors={errors} name="broker_phone" label="Phone" value={broker.broker_phone} onChange = {this.onChangeHandler.bind(this)}/>
                                
                            </div>
                            
                            
                        </BorderBox>
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}
export default connect(mapStateToProps) (  EditBroker);