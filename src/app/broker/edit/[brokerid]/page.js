"use client"
import Panel from '@/components/widget/panel';
import { useEffect } from 'react';
import Helper from '@/inc/Helper';
import EditBroker from '../../../../components/broker/EditBroker';
const Page = (props) => {
    useEffect(() => {
        Helper.setPageData({
            title:'Edit Broker ',
            pageTitle:'Edit Broker ',
        })
    });
    let brokerid = props.params.brokerid;
    return(
        <Panel>
            <EditBroker broker_id={brokerid}/>
            

            
        </Panel>
    ) 
}
export default Page;