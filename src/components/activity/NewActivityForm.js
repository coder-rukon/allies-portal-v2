"use client"
import React, { Component } from 'react';
import Input from '../forms/Input';
import Dropdown from '@/components/forms/Dropdown';
import Helper from '@/inc/Helper';
import '../../../public/css/flatpickr.min.css';
import '../../../public/js/flatpickr.js';
import $ from 'jquery';
import Button from '../forms/button';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import Loading from '../widget/Loading';
class NewActivityForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            errorMessage:[],
            activity:{}
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
        let that = this;
        flatpickr("#datepicker_activity",
            {
                //enableTime: true,
                dateFormat: Helper.getDatePickerFormate(),
                onChange:(selectedDates, dateStr, instance)=>{
                    let activity = that.state.activity;
                    that.setState({
                        activity:{
                            ...activity,
                            activity_date:dateStr
                        }
                    })
                }
            }
        );
    }
    onChangeHandler(event){
        let activity = this.state.activity;

        this.setState({
            activity:{
                ...activity,
                [event.target.name]:event.target.value
            }
        })
    }
    onCancleClickHandler(){
        if(this.props.onCancle){
            this.props.onCancle()
        }
    }
    onCreateClickHandler(){
        let api = Api, that = this;
        if(api.setUserToken()){
            let activity = this.state.activity;
            let data = {
                activity_source:this.props.source,
                activity_integrator:this.props.integrator,
                activity_subject: activity.activity_subject,
                activity_note: activity.activity_note,
                activity_date: activity.activity_date,
                activity_type: activity.activity_type,
            }
            this.setState({
                loading:true,
                errorMessage:[]
            })
            api.axios().post(Settings.apiUrl + '/activity/create',data).then(res => {
                if(res.data.type ){
                    that.setState({
                        loading:false,
                        errorMessage:[]
                    })
                    if(that.props.onCreate){
                        that.props.onCreate()
                    }
                }else{
                    that.setState({
                        loading:false,
                        errorMessage:res.data.errors
                    })
                }
            })
        }

        
    }
    render() {
        let activityType = Helper.getActivityTypes();
        let errors = this.state.errorMessage;
        return (
            <div className='activity_form'>
                <div className='row'>
                    <Input errors={errors} name="activity_subject" label="Subject *" onChange={this.onChangeHandler.bind(this)}/>
                    <Dropdown errors={errors} options={activityType} label="Activity Type *" name="activity_type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-3"/>
                    <Input errors={errors}  id="datepicker_activity" name="activity_date"  label="Due  *" onChange={this.onChangeHandler.bind(this)} className="datepicker col-xs-12 col-sm-3"/>
                    <Input errors={errors} type="textarea"  label="Note *" name="activity_note" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div className='activity_form_footer'>
                    <div className='af_left'>
                        {
                            /**
                             * <Button icon="delete" className="act_delete"/>
                             */
                        }
                        
                    </div>
                    <div className='af_right'>
                        <Button label="Cancel" className="frm_cancel" onClick = { this.onCancleClickHandler.bind(this)}/>
                        {
                            this.state.loading ? <Loading/> : <Button label="Add Activity" onClick={this.onCreateClickHandler.bind(this)} />
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default NewActivityForm;