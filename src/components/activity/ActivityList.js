"use client"
import React, { Component } from 'react';
import BorderBox from '../widget/borderbox';
import Button from '../forms/button';
import NewActivityForm from '@/components/activity/NewActivityForm';
import ActivityItem from './ActivityItem';
class ActivityList extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleForm: false,
            items:[{},{},{}]
        }
    }
    addItem(){
        let items = this.state.items;
        items.push( this.blankItem() );
        this.setState({
            visibleForm:true,
            items:items
        })
    }
    blankItem(){
        return {}
    }
    onCreateHanlder(){
        this.setState({
            visibleForm:false,
        })
    }
    onCancleFormHandler(){
        this.setState({
            visibleForm:false,
        })
    }
    render() {
        let items = this.state.items;
        let titleText = <>Activity</>;
        if(!this.state.visibleForm){
            titleText = <>Activity<Button onClick={this.addItem.bind(this)}  label="+ Add"/></>
        }
        return (
            <BorderBox className="activity_lists" title={titleText}>
                {this.state.visibleForm ? <NewActivityForm onCreate={this.onCreateHanlder.bind(this)} onCancle={this.onCancleFormHandler.bind(this)}/> : ''}
                <div className='activity_items'>
                    {
                        items.map( (item,key) => {
                            return <ActivityItem key={key} item={item} />
                        })
                    }
                </div>
            </BorderBox>
        );
    }
}

export default ActivityList;