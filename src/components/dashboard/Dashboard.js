import React, { Component } from 'react';
import BorderBox from '../widget/borderbox';
import Panel from '../widget/panel';
import SmartBox from '../widget/SmartBox';
import Api from '@/inc/Api';
import Link from 'next/link';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{}
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        let that = this, api= Api;
        if(api.setUserToken()){
            api.axios().get('/dashboard/all').then(res=>{
                that.setState({
                    data:res.data.data
                })
            })
        }
    }
    render() {
        let data = this.state.data;
        let followup_reminders = data.followup_reminders ? data.followup_reminders.data : [];
        return (
            <div className='dashboard_items'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-3 col-md-3 mb-4'>
                        <SmartBox title="Deals" number="10">
                            <ul>
                                <li>Active Deal: <span>50</span></li>
                                <li>Completed: <span>20</span></li>
                            </ul>
                        </SmartBox>
                    </div>
                    <div className='col-xs-12 col-sm-3 col-md-3'>
                        <SmartBox title="Property" number={data?.property?.total} color1="#8746D0" color2="#46229C">
                            <ul>
                                <li>Active Property: <span>{data?.property?.active}</span></li>
                                <li>Inactive Property: <span>{data?.property?.inactive}</span></li>
                            </ul>
                        </SmartBox>
                    </div>
                    <div className='col-xs-12 col-sm-3 col-md-3'>
                        <SmartBox title="Users" number={data?.user?.total} color2="#F9AC37" color1="#F78E4C">
                            <ul>
                                <li>Allies Users: <span>{data?.user?.brokers}</span></li>
                                <li>Actives: <span>{data?.user?.active}</span></li>
                            </ul>
                        </SmartBox>
                    </div>
                    <div className='col-xs-12 col-sm-3 col-md-3'>
                        <SmartBox title="Brokers DB" number={data?.broker?.total} color1="#3AD1BE" color2="#1898CA">
                            <ul>
                                <li>My Brokers: <span>{data?.broker?.my_broker}</span></li>
                                <li>Other Brokers: <span>{data?.broker?.other_broker}</span></li>
                            </ul>
                        </SmartBox>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-3 col-md-4 mb-4'>
                        <Panel>
                            <BorderBox  title="Upcoming Reminder">
                                <div className='follow_up_reminder_box'>
                                    <ul>
                                        {followup_reminders.map( (item,key) => {
                                            return(<li key={key}><Link href={'/company/details/'+item.integrator}><div className='details'>{item.details}</div><span className='date'>{item.reminder_date}</span></Link></li>)
                                        })}
                                    </ul>
                                </div>
                            </BorderBox>
                        </Panel>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Dashboard;