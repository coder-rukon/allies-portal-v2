"use client"
import Helper from '@/inc/Helper';
import React, { Component } from 'react';

class ActivityItem extends Component {

    getText(){
        let activity = this.props.activity;
        let activityType = Helper.getActivityTypes(activity.activity_type);
        return(
            <div className='activity_item_text'>
                <div className='d-flex  justify-content-between gap-2'>
                    <span className='activity_type'>{activityType?.label}</span>
                    <span className='activity_creator'>{activity?.first_name + ' '+activity.last_name}</span>
                </div>
                
                <div className='title_date'>
                    <h3>{activity.activity_subject}</h3>
                    
                    <span>Due on <span>{activity.activity_date}</span></span>
                </div>
                <div className='activity_note'>{activity.activity_note}</div>
            </div>
        )
    }
    render() {
        return (
            <div className='activity_item'>
                {this.getText()}
            </div>                                                                                                                                                                                                                                                                                                        
        );
    }
}

export default ActivityItem;