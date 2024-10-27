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
import Api from '@/inc/Api';
import Loading from '@/components/widget/Loading';
import AlertMessage from '@/components/widget/AlertMessage';

class ActivitySidebarWidget extends Component {
    constructor(props){
        super(props);
        this.state = {
            isClickedDelete:false,
            isClickedCancel:false,
            activity:this.props.activity,
            dueOptions:[],
            isFollowUp:'no',
            saving:false,
            message:null,
            messageType:false,
            isDeleting:false,
            followUpdData:{}
        }
        this.datePicker = null;
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
        this.loadDueOptions();
        let that = this;
        this.datePicker = flatpickr("#datepicker_activity",
            {
                //enableTime: true,
                minDate: new Date(),
                defaultDate: this.props.activity.activity_date_time_datpicker,
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
    loadDueOptions(){
        let that = this, api = Api;
        if(api.setUserToken()){
            api.axios().get('/activity/activity-options').then( (res) => {
                that.setState({
                    dueOptions:res.data.data.follow_up_due
                })
            })
        }

    }
    setActivity(activity){
        if(this.datePicker){
            this.datePicker.setDate(activity.activity_date_time_datpicker ? activity.activity_date_time_datpicker : '')
        }
        this.setState({
            activity:{
                ...activity,
                activity_contact_name: activity.activity_contact_name ? activity.activity_contact_name : '',
                activity_date_time: activity.activity_date_time_datpicker ? activity.activity_date_time_datpicker : ''
            }
        })
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
    onCompleteNotCompleteClick(){
        let activity = this.state.activity;
        this.setState({
            activity:{
                ...activity,
                is_completed: activity.is_completed ? (activity.is_completed == 'yes' ? 'no' : 'yes') : 'no' 
            }
        })
    }
    onCancleClickHandler(){
        
        if(this.props.onCancleClick){
            this.props.onCancleClick()
        }
    }
    onSaveHandler(){
        let activity = this.state.activity;
        let followUpdData = this.state.followUpdData;
        let data = {
            activity_id: activity.activity_id,
            activity_subject :activity.activity_subject,
            activity_date: activity.activity_date ,
            activity_type:activity.activity_type,
            is_completed:activity.is_completed,
            activity_contact_name:activity.activity_contact_name,
            activity_contact_id:activity.activity_contact_id,
            activity_note:activity.activity_note,
            is_followup: this.state.isFollowUp == 'yes' ? 'yes' : 'no',
            activity_followup: followUpdData
        }
        let api = Api, that = this;
        
        if(api.setUserToken()){
            that.setState({
                saving:true,
                messageType:true,
                message:null,
            })
            api.axios().post('/activity/update',data).then(res=> {
               
                that.setState({
                    messageType:res.data.type,
                    message:res.data.message,
                    saving:false
                })
                if(that.props.onActivitySave && res.data.type === true){
                    that.props.onActivitySave(res.data);
                }
                
            }).catch(error => {
                that.setState({
                    saving:false
                })
                console.log(error)
            })
        }
    }
    onFolowUpClickHanlder(isFollowUp){
        this.setState({
            isFollowUp: isFollowUp
        })
    }
    followUpChangeHandler(event){
        let followUpData = this.state.followUpdData;
        this.setState({
            followUpdData:{
                ...followUpData,
                [event.target.name]:event.target.value
            }
        })
    }
    getFollowUpForm(){
        if(this.state.isFollowUp != 'yes'){
            return <></>
        }
        let activityType = Helper.getActivityTypes();
        let activity_due = this.state.dueOptions;
        let followUpData = this.state.followUpdData;
        return(
            <div className='row'>
                <Input value={followUpData.activity_subject} label="Subject *" name="activity_subject" onChange={this.followUpChangeHandler.bind(this)}/>
                <Dropdown options={activityType}  value={followUpData.activity_type} label="Activity Type *" name="activity_type" onChange={this.followUpChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                <Dropdown options={activity_due}  value={followUpData.activity_date} label="Due *" name="activity_date" onChange={this.followUpChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                <Input type="textarea"  value={followUpData.activity_note}  label="Note" name="activity_note" onChange={this.followUpChangeHandler.bind(this)} className="col-xs-12"/>
            </div>
        )
    }
    onDeleteHandler(){
        let activity = this.state.activity;
        let that = this, api = Api;
        if(api.setUserToken()){
            that.setState({
                isDeleting:true
            })
            api.axios().post('/activity/delete/',{activity_id: activity.activity_id}).then(res=>{
                if(res.data.type == false){
                    that.setState({
                        messageType:res.data.type,
                        message:res.data.message,
                        isDeleting:false,
                        isClickedDelete:false
                    })
                }
                if(res.data.type == true && that.props.onActivitySave){
                    that.props.onActivitySave(res.data)
                }
            })
        }
    }
    getDeletePopup(){
        if(!this.state.isClickedDelete){
            return<></>
        }
        return (
            <Popup isCenter={true} isInner={true} width="80%" onClose={ ()=> {this.setState({isClickedDelete:false})}}>
                <h3>Delete activity?</h3>
                <p>This can’t be undone</p>
                {
                    this.state.isDeleting ? <Loading/> : <>
                        <div className='d-flex justify-content-end mt-4'>
                            <Button label="Cancel"  onClick={ ()=> {this.setState({isClickedDelete:false})}}   className="no_bg" />
                            <Button label="Delete" onClick={this.onDeleteHandler.bind(this)} className="danger" />
                        </div>
                    </>
                }
                
            </Popup>
        )
    }
    
    render() {
        let titleWithBtn = <>Complete Activity <Button icon="close" onClick={this.onCancleClickHandler.bind(this)} /></>
        let activityType = Helper.getActivityTypes();
        let activity = this.state.activity;
        let activityCompanyLink = activity.activity_source == 'company' ? '/company/details/'+activity.activity_integrator : '';
        return (
            <div className='activity_sidebar_widget'>
                {
                    this.getDeletePopup()
                }
                
                <BorderBox title={titleWithBtn}>
                    <div className='row'>
                        <Input name="activity_contact_name" value={activity.activity_contact_name}  label="Contact name *" onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Dropdown options={activityType} label="Activity Type *" name="activity_type" value={activity.activity_type} onChange={this.onChangeHandler.bind(this)} className="col-xs-12 col-sm-6"/>
                        <Input name="activity_subject" value={activity.activity_subject} label="Subject *" onChange={this.onChangeHandler.bind(this)} className="col-xs-12"/>
                        <Input  id="datepicker_activity" label="Date  *" name="activity_date" className="datepicker col-xs-12 col-sm-6"/>
                        <div className='col-xs-12 col-sm-6'><Button className= {activity.is_completed == 'yes' ? "mt-4 block " : "mt-4 block bordered"} label={activity.is_completed == 'yes' ? "Complete" : "Incomplete"} onClick={ this.onCompleteNotCompleteClick.bind(this)}/></div>
                        <Input type="textarea"  label="Note" name="activity_note"   value={activity.activity_note}  onChange={this.onChangeHandler.bind(this)}/>
                    </div>
                </BorderBox>
                <BorderBox>
                    <div className="btn-group follow_up_actions" role="group">
                        <Button label="Follow Up" className={this.state.isFollowUp == 'yes' ? '' : 'bordered'} onClick = { this.onFolowUpClickHanlder.bind(this,'yes')}/>
                        <Button label="No Follow Up" className={this.state.isFollowUp == 'no' ? '' : 'bordered'} onClick = { this.onFolowUpClickHanlder.bind(this,'no')}/>
                    </div>
                    {this.getFollowUpForm()}
                    
                </BorderBox>
                <div className='mt-4 mb-4'>
                    <Button className="bordered block" href={activityCompanyLink} label={'Open Profile ( ' +activity?.activity_company_name + ' )'}/>
                </div>
                {
                    this.state.message ? <AlertMessage message={this.state.message} type={this.state.messageType == true ? 'alert alert-success mt-3' : 'alert alert-danger mt-3'}/> : ''
                }
                {
                    this.state.saving ? <Loading/> : ''
                }
                <div className='activity_form_footer'>
                    <div className='af_left'><Button icon="delete" onClick={ ()=> {this.setState({isClickedDelete:true})}} className="act_delete only_icon"/></div>
                    <div className='af_right'>
                        <Button label="Cancel" className="frm_cancel" onClick = { this.onCancleClickHandler.bind(this)}/>
                        <Button label="Save" disable={this.state.saving} onClick={this.onSaveHandler.bind(this)} />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ActivitySidebarWidget;