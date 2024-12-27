import React, { Component } from 'react';
import Input from '@/components/forms/Input';
import '../../../../public/css/flatpickr.min.css';
import '../../../../public/js/flatpickr.js';
import $ from 'jquery';
import Helper from "@/inc/Helper";
class DealDetails extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        flatpickr("#listing_expiration",
            {
                //enableTime: true,
                minDate: new Date(),
                dateFormat: Helper.getDatePickerFormate(),
                onChange:(selectedDates, dateStr, instance)=>{
                    
                }
            }
        );
        flatpickr("#listing_expiration_reminder",
            {
                //enableTime: true,
                minDate: new Date(),
                dateFormat: Helper.getDatePickerFormate(),
                onChange:(selectedDates, dateStr, instance)=>{
                    
                }
            }
        );
    }
    render() {
        return (
            <div className='deal_short_details'>
                <div className='row'>
                    <Input type="textarea" name="building_highlights" label="Building Highlights" placeholder="Type here..." className="col-sm-12 col-xs-12" />
                    <Input type="textarea" name="marketing_description" label="Marketing Description"  placeholder="Type here..." className="col-sm-12 col-xs-12" />
                    <Input name="listing_title" label="Listing Title" className="col-sm-12 col-xs-12" />
                    <Input id="listing_expiration" name="listing_expiration" label="Listing Expiration" className="col-sm-6 col-xs-12 datepicker" />
                    <Input id="listing_expiration_reminder" name="listing_expiration_reminder" label="Listing Expiration Reminder" className="col-sm-6 col-xs-12 datepicker" />
                </div>
            </div>
        );
    }
}

export default DealDetails;