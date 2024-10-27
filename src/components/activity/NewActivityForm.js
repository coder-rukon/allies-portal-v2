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
            contactSearchResults:[],
            contact_name_search:'',
            activity:{
                activity_type: this.props.activity_type ? this.props.activity_type  :  null
            }
        }
        this.contactSearchTimeout = null;
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
        let that = this;
        flatpickr("#datepicker_activity",
            {
                //enableTime: true,
                minDate: new Date(),
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
                is_selected_contact: this.props.enableSearchCompany == true ? 'yes' : 'no',
                activity_source:activity.activity_source ? activity.activity_source : this.props.source  ,
                activity_integrator: activity.activity_integrator ? activity.activity_integrator : this.props.integrator,
                activity_subject: activity.activity_subject,
                activity_note: activity.activity_note,
                activity_date: activity.activity_date,
                activity_type: activity.activity_type,
                activity_contact_id: activity.activity_contact_id ? activity.activity_contact_id : null
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
    contactNameSearchHandler(event){
        let sKeyValue = event.target.value;
        let api = Api, that = this;
        clearTimeout(this.contactSearchTimeout);
        let activity = this.state.activity;
        

        this.setState({
            contact_name_search:sKeyValue,
            contactSearching:true,
            contactSearchResults:[],
            activity:{
                ...activity,
                activity_contact_id:null,
                activity_integrator:null,
                activity_source:null,
            }
        })
        if(api.setUserToken()){
            this.contactSearchTimeout = setTimeout(function(){
                api.axios().post('/contacts/search',{s:sKeyValue}).then(res=>{
                    console.log(res.data);
                    that.setState({
                        contactSearching:false,
                        contactSearchResults:res.data.data
                    })
                }) 
            },500)
            
        }
    }
    onContactNameClickHandler(contact,event){
        let activity = this.state.activity;
        this.setState({
            contact_name_search:contact.contact_name,
            contactSearchResults:[],
            activity:{
                ...activity,
                activity_contact_name:contact.contact_name,
                activity_contact_id:contact.contact_id,
                activity_integrator:contact.contact_integrator,
                activity_source:contact.contact_source,
            }
        })
    }
    contactNameSearch(){
        if(!this.props.enableSearchCompany)
            return <></>
        let errors = this.state.errorMessage;

        return(
            <div className='col-xs-12 contact_name_search_group'>
                <Input errors={errors} value={this.state.contact_name_search} errorName="activity_contact_id"  label="Contact name *" onChange={this.contactNameSearchHandler.bind(this)}/>
                <div className='s_output' style={{display:this.state.contactSearchResults.length <= 0 ? 'none': 'block'}}>
                    {
                        this.state.contactSearchResults.map( (conResult, key) => {
                            return(
                                <p key={key} onClick={this.onContactNameClickHandler.bind(this,conResult)}>
                                    {conResult.contact_name	}
                                    <span>{conResult?.contact_company_name}</span>
                                </p>
                            )
                        })
                    }
                </div>
                {this.state.contactSearching ? <Loading/> : ''}
            </div>
            
        )
    }
    render() {
        let activityType = Helper.getActivityTypes();
        let errors = this.state.errorMessage;
        let activityDateTypeCol = this.props.dateTypeCol ? this.props.dateTypeCol : 'col-sm-3';
        let activity = this.state.activity;
        return (
            <div className='activity_form'>
               
                <div className='row'>
                    {
                        this.contactNameSearch()
                    }
                    <Input errors={errors} name="activity_subject" label="Subject *" onChange={this.onChangeHandler.bind(this)} className="col-xs-12"/>
                    <Dropdown errors={errors} options={activityType} label="Activity Type *" value={activity.activity_type} name="activity_type" onChange={this.onChangeHandler.bind(this)} className={"col-xs-12 " + activityDateTypeCol}/>
                    <Input errors={errors}  id="datepicker_activity" name="activity_date"  label="Due  *" onChange={this.onChangeHandler.bind(this)} className={"datepicker col-xs-12 " + activityDateTypeCol}/>
                    <Input errors={errors} type="textarea"  label="Note" name="activity_note" onChange={this.onChangeHandler.bind(this)} className="col-xs-12"/>
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