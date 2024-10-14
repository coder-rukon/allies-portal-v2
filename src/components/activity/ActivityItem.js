"use client"
import React, { Component } from 'react';

class ActivityItem extends Component {
    getText(){
        return(
            <div className='activity_item_text'>
                <span className='activity_type'>In-Person Meeting</span>
                <div className='title_date'>
                    <h3>Request preferences</h3>
                    <span>Due on <span>20/25/2024</span></span>
                </div>
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