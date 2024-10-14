"use client"
import React, { Component } from 'react';
import Input from '../forms/Input';
import Dropdown from '@/components/forms/Dropdown';
import Helper from '@/inc/Helper';
import '../../../public/css/flatpickr.min.css';
import '../../../public/js/flatpickr.js';
import $ from 'jquery';
import Button from '../forms/button';
class NewActivityForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity:''
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
                dateFormat: "d/m/Y",
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

    }
    onCancleClickHandler(){
        if(this.props.onCancle){
            this.props.onCancle()
        }
    }
    onCreateClickHandler(){
        if(this.props.onCreate){
            this.props.onCreate()
        }
    }
    render() {
        let activityType = Helper.getActivityTypes();
        return (
            <div className='activity_form'>
                <div className='row'>
                    <Input name="activity_subject" label="Subject *" onChange={this.onChangeHandler.bind(this)}/>
                    <Dropdown options={activityType} label="Activity Type *" name="activity_type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-3"/>
                    <Input  id="datepicker_activity" label="Due  *" onChange={this.onChangeHandler.bind(this)} className="datepicker col-xs-12 col-sm-3"/>
                    <Input type="textarea"  label="Note *" name="activity_note" onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div className='activity_form_footer'>
                    <div className='af_left'><Button icon="delete" className="act_delete"/></div>
                    <div className='af_right'>
                        <Button label="Cancel" className="frm_cancel" onClick = { this.onCancleClickHandler.bind(this)}/>
                        <Button label="Add Activity" onClick={this.onCreateClickHandler.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default NewActivityForm;