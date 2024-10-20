"use client"
import Dashboard from '@/components/dashboard/Dashboard'
import Helper from '@/inc/Helper';
import ActivityDashboard from '@/components/activity/dashboard/ActivityDashboard'
import { useEffect } from 'react'
import Panel from '@/components/widget/panel';
let Index = (props) => {
    useEffect(function(){
        Helper.setPageData({
            title:"Dashboard",
            pageTitle:'Dashboard'
        })
    },[])
    return(
        <div className="dashboard_page">
            <Panel>
                <ActivityDashboard/>
            </Panel>
        </div>
    )
}
export default Index;