"use client"
import React, { Component } from 'react';
import ActivityWidget from './ActivityWidget';
import ActivitySidebarWidget from './ActivitySidebarWidget';
import Api from '@/inc/Api';
import Loading from '@/components/widget/Loading';
import Button from '@/components/forms/button';
class ActivityDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            editActivity:null,
            activityList:[],
            filters:{
                days:'today',
                is_completed:'no',
            },
            loading:false
        }
        this.activitySidebar = null;
    }
    componentDidMount(){
        this.loadActivity()
    }
    loadActivity(){
        let api = Api, that = this;
        if(api.setUserToken()){
            that.setState({
                loading:true
            })
            api.axios().get('/activity/dashboard-activity').then(res => {
                that.setState({
                    loading:false,
                    activityList:res.data.data
                })
            })
        }
    }
    onSidebarCancle(){
        this.setState({
            editActivity:null
        })
    }
    onActivityClick(activity){
        this.setState({
            editActivity:activity
        })
        if(this.activitySidebar){
            this.activitySidebar.setActivity(activity)
        }
    }
    onFilterButtonClick(day,event){
        let filters = this.state.filters;
        this.setState({
            filters:{
                ...filters,
                days:day
            }
        })
    }
    onActivitySave(){
        let that = this;
        this.setState({
            editActivity:null
        },function(){
            this.loadActivity()
        })
        
    }
    render() {
        let widgetData = this.state.activityList;
        if(this.state.loading){
            return(
                <div className='activity_dashboard text-center'>
                    <p>Loading Activity</p>
                    <Loading/>
                </div>
            )
        }
        let filters = this.state.filters;
        return (
            <div className='activity_dashboard'>
                <div className='av_dashboard_top_btns'>
                    <div className='rs_btn_borders_box'>
                        <Button label="Past Due (2)" className={filters.days == 'past' ? "active" : ''}  onClick={this.onFilterButtonClick.bind(this,'past')} />
                        <Button className={filters.days == 'today' ? "active" : ''} label="Today"  onClick={this.onFilterButtonClick.bind(this,'today')} />
                        <Button label="Next 7 Days" className={filters.days == 7 ? "active" : ''}  onClick={this.onFilterButtonClick.bind(this,7)}/>
                        <Button label="Next 30 Days" className={filters.days == 30 ? "active" : ''}  onClick={this.onFilterButtonClick.bind(this,30)} />
                    </div>
                    <p>Show Completed</p>
                </div>
                <div className='activity_widgets'>
                    <div className='row'>
                        
                            {
                                widgetData.map( (data,key) => {
                                    return <div className='col-xs-12 col-sm-4' key={key}><ActivityWidget onActivityClick={this.onActivityClick.bind(this)} activity={data} /></div>
                                })
                            }
                        
                    </div>
                </div>
                {this.state.editActivity ? <ActivitySidebarWidget onActivitySave = {this.onActivitySave.bind(this)} onReady={ objSidebar => { this.activitySidebar = objSidebar }} onCancleClick={this.onSidebarCancle.bind(this)} activity={this.state.editActivity }/> : '' }
            </div>
        );
    }
}

export default ActivityDashboard;