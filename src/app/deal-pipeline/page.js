"use client"
import { useEffect } from "react"
import DealPipelines from "./DealPipelines"
import Helper from "@/inc/Helper"

const Page = (props) => {
    useEffect(function(){
        Helper.setPageData({
            pageTitle:'Deal Pipeline',
            title:'Deal Pipeline'
        })
    },[])
    return <DealPipelines/>
}
export default Page;