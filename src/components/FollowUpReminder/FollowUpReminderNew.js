import Button from '@/components/forms/button';
import Input from '@/components/forms/Input';
import React, { Component } from 'react';
import '../../../public/css/flatpickr.min.css';
import '../../../public/js/flatpickr.js';
import $ from 'jquery';
import ErrorMessage from '../widget/errormessage';

class FollowUpReminderNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            saving:false,
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
    render() {
        let remainder = this.state.remainder;
        return (
            <div className='follow_up_remainder_module'>
                <div className='follow_up_remainder_form'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <Input value={remainder.reminder_date}  className="datepicker" id="datepicker" name="reminder_date" label="Reminder Date" placeholder="Select Date" />
                            <ErrorMessage error={this.props.error_date}/>
                        </div>
                    </div>
                    
                    <Input type="textarea" value={remainder.details} name="details" onChange={this.onChangeHandler.bind(this)} label="Note" placeholder="Write a note...." />
                </div>
            </div>
        );
    }
}

export default FollowUpReminderNew;