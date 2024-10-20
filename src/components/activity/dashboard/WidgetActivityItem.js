"use client"
import React, { Component } from 'react';

class WidgetActivityItem extends Component {
    onClickHanlder(){
        if(this.props.onActivityClick){
            this.props.onActivityClick({})
        }
    }
    render() {
        return (
            <div className='widget_activity_item' onClick={this.onClickHanlder.bind(this)}>
                <h2><span>Jamie Withers</span><span>(317) 548-6248</span></h2>
                <div className='deails_with_date'>
                    <div className='details'>
                        <p className='address'>2 Towers Inc.</p>
                        <p className='note'>Are they still interest in renewing their lease?</p>
                    </div>
                    <span className='date'>Today</span>
                </div>
            </div>
        );
    }
}

export default WidgetActivityItem;