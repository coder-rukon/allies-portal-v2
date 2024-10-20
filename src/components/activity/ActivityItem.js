"use client"
import Helper from '@/inc/Helper';
import React, { Component } from 'react';

class ActivityItem extends Component {

    getText(){
        let activity = this.props.activity;
        let activityType = Helper.getActivityTypes(activity.activity_type);
        return(
            <div className='activity_item_text'>
                <span className='activity_type'>{activityType?.label}</span>
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