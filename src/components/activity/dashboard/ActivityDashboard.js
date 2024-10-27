"use client"
import React, { Component } from 'react';
import ActivityWidget from './ActivityWidget';
import ActivitySidebarWidget from './ActivitySidebarWidget';
import Api from '@/inc/Api';
import Loading from '@/components/widget/Loading';
import Button from '@/components/forms/button';
import Popup from '@/components/widget/Popup';
import NewActivityForm from '../NewActivityForm';
class ActivityDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            editActivity:null,
            visibleNewActivityPopup:false,
            activityList:[],
            new_activity_type:'',
            pastActivityCount:0,
            filters:{
                days:'today',
                is_completed:'no',
            },
            loading:false
        }
        this.activitySidebar = null;
    }
    componentDidMount(){
        this.loadPastActivity();
        this.loadActivity()
    }
    loadPastActivity(){
        let that = this, api = Api;
        if(api.setUserToken()){
            api.axios().get('/activity/dashboard-past-activity-count').then(res => {
                that.setState({
                    pastActivityCount:res.data.data.total_past_activity
                })
            })
        }
    }
    loadActivity(){
        let api = Api, that = this;
        if(api.setUserToken()){
            that.setState({
                loading:true
            })
            let data = {
                filters:this.state.filters,
            }
            api.axios().post('/activity/dashboard-activity',data).then(res => {
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
                is_completed:'no',
                days:day
            }
        },function(){
            this.loadActivity()
        })
    }  
    onShowCompleteClick(event){
        let filters = this.state.filters;
        this.setState({
            filters:{
                ...filters,
                days:null,
                is_completed:filters.is_completed == 'yes' ? 'no' : 'yes'
            }
        }, function(){
            this.loadActivity()
        })
    }
    onActivitySave(){
        let that = this;
        this.setState({
            visibleNewActivityPopup:false,
            editActivity:null
        },function(){
            this.loadActivity()
        })
        
    }
    onNewActivityCloseHanlder(event){
        this.setState({
            visibleNewActivityPopup:false
        })
    }
    newActivityPopup(){
        if(!this.state.visibleNewActivityPopup){
            return <></>
        }
       return(
            <Popup isCenter={true} width={"500px"} onClose={this.onNewActivityCloseHanlder.bind(this)}>
                <NewActivityForm activity_type={this.state.new_activity_type} onCreate={this.onActivitySave.bind(this)} dateTypeCol="col-sm-6" onCancle={this.onNewActivityCloseHanlder.bind(this)} enableSearchCompany={true}/>
            </Popup>
       )
    }
    
    render() {
        let widgetData = this.state.activityList;
        let filters = this.state.filters;
        let pastDueTitle = this.state.pastActivityCount >= 1 ? <span style={{color:"red"}}>Past Due ( {this.state.pastActivityCount})</span> : 'Past Due ( 0 )';
        return (
            <div className='activity_dashboard'>
                 {
                    this.newActivityPopup()
                }
                <div className='av_dashboard_top_btns'>
                    <div className='rs_btn_borders_box'>
                        <Button label={ pastDueTitle } className={filters.days == 'past' ? "active" : ''}  onClick={this.onFilterButtonClick.bind(this,'past')} />
                        <Button className={filters.days == 'today' ? "active" : ''} label="Today"  onClick={this.onFilterButtonClick.bind(this,'today')} />
                        <Button label="Next 7 Days" className={filters.days == 7 ? "active" : ''}  onClick={this.onFilterButtonClick.bind(this,7)}/>
                        <Button label="Next 30 Days" className={filters.days == 30 ? "active" : ''}  onClick={this.onFilterButtonClick.bind(this,30)} />
                    </div>
                    <p onClick={this.onShowCompleteClick.bind(this)}> {filters.is_completed == 'yes' ? <span className="material-symbols-outlined">check_box</span> : ''} Show Completed</p>
                </div>
                {
                    this.state.loading ? <div className='activity_dashboard text-center'> <p>Loading Activity</p> <Loading/></div> : ''
                }
                <div className='activity_widgets'>
                    <div className='row'>
                        
                            {
                                widgetData.map( (data,key) => {
                                    return <div className='col-xs-12 col-sm-4' key={key}><ActivityWidget disableAddNew={filters.days == 'past' ? true : false } onAddClick={ activity_widget=> { this.setState({visibleNewActivityPopup:true,new_activity_type:activity_widget.activity_type})}} onActivityClick={this.onActivityClick.bind(this)} activity={data} /></div>
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