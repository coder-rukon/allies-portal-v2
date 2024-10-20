"use client"
import React, { Component } from 'react';
import ActivityWidget from './ActivityWidget';
import ActivitySidebarWidget from './ActivitySidebarWidget';
class ActivityDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            editActivity:null
        }
    }
    onSidebarCancle(){
        this.setState({
            editActivity:null
        })
    }
    onActivityClick(){
        this.setState({
            editActivity:{}
        })
    }
    render() {
        let widgetData = [{},{},{}];
        return (
            <div className='activity_dashboard'>
                <div className='activity_widgets'>
                    <div className='row'>
                        
                            {
                                widgetData.map( (data,key) => {
                                    return <div className='col-xs-12 col-sm-4' key={key}><ActivityWidget onActivityClick={this.onActivityClick.bind(this)} activity={data} /></div>
                                })
                            }
                        
                    </div>
                </div>
                {this.state.editActivity ? <ActivitySidebarWidget onCancleClick={this.onSidebarCancle.bind(this)} activity={this.state.editActivity }/> : '' }
            </div>
        );
    }
}

export default ActivityDashboard;