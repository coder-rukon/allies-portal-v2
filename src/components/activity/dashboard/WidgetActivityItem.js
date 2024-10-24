"use client"
import Helper from '@/inc/Helper';
import React, { Component } from 'react';

class WidgetActivityItem extends Component {
    onClickHanlder(){
        let activity = this.props.activity;
        if(this.props.onActivityClick){
            this.props.onActivityClick(activity)
        }
    }
    render() {
        let activity = this.props.activity;
        return (
            <div className='widget_activity_item' onClick={this.onClickHanlder.bind(this)}>
                <h2><span>{activity.activity_contact_name}</span><span>{ ( activity.activity_type == 1 || activity.activity_type == 2 ) ? activity.activity_contact_by : Helper.getActivityTypes(activity.activity_type)?.label}</span></h2>
                <div className='deails_with_date'>
                    <div className='details'>
                        <p className='company_name'>{activity?.activity_company_name}</p>
                        <p className='subject'>{activity.activity_subject}</p>
                    </div>
                    <span className='date'>{activity.activity_date_display}</span>
                </div>
            </div>
        );
    }
}

export default WidgetActivityItem;