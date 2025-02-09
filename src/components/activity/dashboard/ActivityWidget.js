"use client"
import Button from '@/components/forms/button';
import BorderBox from '@/components/widget/borderbox';
import React, { Component } from 'react';
import WidgetActivityItem from './WidgetActivityItem';
class ActivityWidget extends Component {
    onActivityClick(activity){
        if(this.props.onActivityClick){
            this.props.onActivityClick(activity)
        }
    }
    onAddBtnClick(){
        if(this.props.onAddClick){
            this.props.onAddClick(this.props.activity)
        }
    }
    render() {
        let activity = {...this.props.activity}
        let title = <>{activity.title} <Button onClick={this.onAddBtnClick.bind(this)} label="+ Add"/></>
        if(this.props.disableAddNew == true){
            title = activity.title;
        }
        let items = activity.activity ? activity.activity : [];
        return (
            <div className='activity_widget'>
                <BorderBox title={title}>
                    <div className='widget_activity_list'>
                        {items.length <= 0 ? <div className='emty_data'>You’re All Caught Up!</div> : ''}
                        {
                            items.map( (activity , key ) => {
                                return <WidgetActivityItem onActivityClick ={this.onActivityClick.bind(this)} activity={activity} key={key}/>
                            })
                        }
                    </div>
                </BorderBox>
            </div>
        );
    }
}

export default ActivityWidget;