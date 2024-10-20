"use client"
import React, { Component } from 'react';
import BorderBox from '../widget/borderbox';
import Button from '../forms/button';
import NewActivityForm from '@/components/activity/NewActivityForm';
import ActivityItem from './ActivityItem';
import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import Loading from '../widget/Loading';
class ActivityList extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleForm: false,
            items:[]
        }
    }
    componentDidMount(){
        
        this.loadActivity()
    }
    loadActivity(){
        if(!this.props.source || !this.props.integrator){
            return;
        }
        let api = Api, that = this;
        this.setState({
            loading:true,
            items:[]
        })
        api.setUserToken();
        api.axios().get(Settings.apiUrl+'/activity/get/'+this.props.source+'/'+this.props.integrator).then(res => {
            that.setState({
                items:res.data.data,
                loading:false
            })
        })
    }
    addItem(){
        this.setState({
            visibleForm:true,
        })
    }
    blankItem(){
        return {}
    }
    onCreateHanlder(){
        this.setState({
            visibleForm:false,
        })
        this.loadActivity()
    }
    onCancleFormHandler(){
        this.setState({
            visibleForm:false,
        })
    }
    render() {
        let items = this.state.items;
        let titleText = <>Activity</>;
        if(!this.props.disable){
            titleText = <>Activity<Button onClick={this.addItem.bind(this)}  label="+ Add"/></>
        }
        return (
            <BorderBox className="activity_lists" title={titleText}>
                {this.state.loading ? <Loading/> : ''}
                {this.state.visibleForm ? <NewActivityForm source={this.props.source} integrator={this.props.integrator} onCreate={this.onCreateHanlder.bind(this)} onCancle={this.onCancleFormHandler.bind(this)}/> : ''}
                <div className='activity_items'>
                    {
                        items.map( (item,key) => {
                            return <ActivityItem key={key} activity={item} />
                        })
                    }
                </div>
            </BorderBox>
        );
    }
}

export default ActivityList;