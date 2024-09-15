"use client"
import Dashboard from '@/components/dashboard/Dashboard'
import Helper from '@/inc/Helper'
import { useEffect } from 'react'
let Index = (props) => {
    useEffect(function(){
        Helper.setPageData({
            title:"Dashboard",
            pageTitle:'Dashboard'
        })
    },[])
    return(
        <div className="dashboard_page">
            <Dashboard/>
        </div>
    )
}
export default Index;