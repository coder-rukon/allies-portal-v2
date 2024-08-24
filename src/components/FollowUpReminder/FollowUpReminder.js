import Button from '@/components/forms/button';
import Input from '@/components/forms/Input';
import React, { Component } from 'react';
import '../../../public/css/flatpickr.min.css';
import '../../../public/js/flatpickr.js';
import $ from 'jquery';
import Api from '../../inc/Api.js';
import Loading from '../widget/Loading';
import ReminderItem from '@/components/FollowUpReminder/ReminderItem';
class FollowUpReminder extends Component {
    constructor(props){
        super(props);
        this.state = {
            all_remainders:[],
            showList:false,
            isLodingRm:false,
            remainder:{
                details:'',
                reminder_date:''
            }
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
        this.loadReminder();
        let that = this;
        flatpickr("#datepicker",
            {
                //enableTime: true,
                dateFormat: "d/m/Y",
                onChange:(selectedDates, dateStr, instance)=>{
                    let remainder = that.state.remainder;
                    that.setState({
                        remainder:{
                            ...remainder,
                            reminder_date:dateStr
                        }
                    })
                }
            }
        );
        
    }
    loadReminder(){
        if(!this.props.integrator){
            return;
        }
        let that = this, api = Api;
        that.setState({
            isLodingRm:true
        })
        api.setUserToken();
        api.axios().get('/reminder/all/'+this.props.source+'/'+this.props.integrator).then(res=>{
            that.setState({
                all_remainders:res.data.data.items,
                isLodingRm:false
            })
        })
    }
    onSaveHandler(){
        let remainder = this.state.remainder, that = this;
        that.setState({
            saving:true
        })
        let api = Api;
        if(api.setUserToken()){
            let data = {
                ...remainder,
                source: this.props.source,
                integrator: this.props.integrator
            }
            api.axios().post('/reminder/create',data).then(res => {
                if(res.data.type){
                    that.setState({
                        success:res.data.message,
                        error:null,
                        saving:false,
                        remainder:{
                            details:'',
                            reminder_date:''
                        }
                    })
                    that.loadReminder();
                }else{
                    that.setState({
                        error:res.data.message,
                        success:null,
                        saving:false
                    })
                }
                
            })
        }
    }
    getData(){
        return this.state.remainder;
    }
    onChangeHandler(event){
        let remainder = this.state.remainder;
        this.setState({
            remainder:{
                ...remainder,
                [event.target.name]:event.target.value
            }
        })
    }
    getForm(){
        let remainder = this.state.remainder;
        return (
            <div className={this.props.disable ? 'follow_up_remainder_form form_hide' : 'follow_up_remainder_form' }>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <Input value={remainder.reminder_date}  className="datepicker" id="datepicker" name="reminder_date" label="Listing Expiration Reminder" placeholder="Select Date" />
                        </div>
                    </div>
                    
                    <Input type="textarea" value={remainder.details} name="details" onChange={this.onChangeHandler.bind(this)} label="Note" placeholder="Write a note...." />
                    <div className='d-flex justify-content-between'>
                        <div>{this.state.saving ? <Loading/> : <Button label="Submit" onClick = {this.onSaveHandler.bind(this)}/> }</div>
                        <div>
                            {
                                /**
                                 * <div className='view_items' onClick={ e=> { this.setState({showList:!this.state.showList})}}><img src={this.state.showList ? "/images/icons/minus.svg" : "/images/icons/plus.svg" }/></div>
                                 */
                            }
                        </div>
                    </div>
                </div>
        )
    }
    getList(){
        if(this.state.isLodingRm){
            return <Loading/>
        }
        if(this.state.all_remainders.length <1){
            return <></>
        }
        return (
            <div className='reminder_list'>
                {
                    this.state.all_remainders.map( (item,key) => {
                        return <ReminderItem disable={this.props.disable} reminder={item}  key ={key}/>
                    })
                }
            </div>
        )
    }
    render() {
        let remainder = this.state.remainder;
        return (
            <div className='follow_up_remainder_module'>
                { this.getForm() }
                { this.getList() }
                
            </div>
        );
    }
}

export default FollowUpReminder;