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
            <div className='row'>
                <div className='col-xs-12 col-sm-8 col-md-6'>
                    <EditBroker broder_id={brokerid}/>
                </div>
            </div>

            
        </Panel>
    ) 
}
export default Page;