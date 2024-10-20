import Button from '@/components/forms/button';
import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import BorderBox from '@/components/widget/borderbox';
import Helper from '@/inc/Helper';
import React, { Component } from 'react';
import '../../../../public/css/flatpickr.min.css';
import '../../../../public/js/flatpickr.js';
import $ from 'jquery';
import Checkbox from '@/components/forms/checkbox';
import Popup from '@/components/widget/Popup';

class ActivitySidebarWidget extends Component {
    constructor(props){
        super(props);
        this.state = {
            isClickedDelete:false,
            isClickedCancel:false,
            activity:'',
            isFollowUp:'no'
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
    onChangeHandler(){

    }
    onCancleClickHandler(){
        
        if(this.props.onCancleClick){
            this.props.onCancleClick()
        }
    }
    onCreateClickHandler(){}
    onFolowUpClickHanlder(isFollowUp){
        this.setState({
            isFollowUp: isFollowUp
        })
    }
    getFollowUpForm(){
        if(this.state.isFollowUp != 'yes'){
            return <></>
        }
        let activityType = Helper.getActivityTypes();
        let activity_due = [
            {label:'Tomorrow', value : '1'},
            {label:'Day After Tomorrow', value : '2'},
            {label:'Two Days Later', value : '3'},
            {label:'Three Days Later', value : '4'},
            {label:'Four Days Later', value : '5'},
            {label:'Five Days Later', value : '6'},
            {label:'Six Days Later', value : '7'},
            {label:'Next Week', value : '7'},
            {label:'Two Week Later', value : '14'},
            {label:'Three Week Later', value : '21'},
            {label:'Four Week Later', value : '28'},
            {label:'Next Month', value : '30'},
            {label:'Two Month Later', value : '60'},
            {label:'Three Month Later', value : '90'},
        ]
        return(
            <div className='row'>
                <Input name="activity_subject" label="Subject *" onChange={this.onChangeHandler.bind(this)}/>
                <Dropdown options={activityType} label="Activity Type *" name="activity_type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                <Dropdown options={activity_due} label="Due *" name="activity_due" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                <Input type="textarea"  label="Note *" name="activity_note" onChange={this.onChangeHandler.bind(this)} className="col-xs-12"/>
            </div>
        )
    }
    getDeletePopup(){
        if(!this.state.isClickedDelete){
            return<></>
        }
        return (
            <Popup isCenter={true} isInner={true} width="80%" onClose={ ()=> {this.setState({isClickedDelete:false})}}>
                <h3>Delete activity?</h3>
                <p>This can’t be undone</p>
                <div className='d-flex justify-content-end mt-4'>
                    <Button label="Cancel"  onClick={ ()=> {this.setState({isClickedDelete:false})}}   className="no_bg" />
                    <Button label="Delete" className="danger" />
                </div>
            </Popup>
        )
    }
    render() {
        let titleWithBtn = <>Complete Activity <Button icon="close" onClick={this.onCancleClickHandler.bind(this)} /></>
        let activityType = Helper.getActivityTypes();
        return (
            <div className='activity_sidebar_widget'>
                {
                    this.getDeletePopup()
                }
                
                <BorderBox title={titleWithBtn}>
                    <div className='row'>
                        <Input name="contact_name" label="Contact name *" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Dropdown options={activityType} label="Activity Type *" name="activity_type" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="activity_subject" label="Subject *" onChange={this.onChangeHandler.bind(this)} className="col-xs-12"/>
                        <Input  id="datepicker_activity" label="Date  *" onChange={this.onChangeHandler.bind(this)} className="datepicker col-xs-12 col-sm-6"/>
                        <div className='col-xs-12 col-sm-6'><Button className="mt-4 block" label="Complete"/></div>
                        <Input type="textarea"  label="Note *" name="activity_note" onChange={this.onChangeHandler.bind(this)}/>
                    </div>
                </BorderBox>
                <BorderBox>
                    <div className="btn-group follow_up_actions" role="group">
                        <Button label="Follow Up" className={this.state.isFollowUp == 'yes' ? '' : 'bordered'} onClick = { this.onFolowUpClickHanlder.bind(this,'yes')}/>
                        <Button label="No Follow Up" className={this.state.isFollowUp == 'no' ? '' : 'bordered'} onClick = { this.onFolowUpClickHanlder.bind(this,'no')}/>
                    </div>
                    {this.getFollowUpForm()}
                    
                </BorderBox>
                <div className='activity_form_footer'>
                    <div className='af_left'><Button icon="delete" onClick={ ()=> {this.setState({isClickedDelete:true})}} className="act_delete only_icon"/></div>
                    <div className='af_right'>
                        <Button label="Cancel" className="frm_cancel" onClick = { this.onCancleClickHandler.bind(this)}/>
                        <Button label="Save" onClick={this.onCreateClickHandler.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivitySidebarWidget;