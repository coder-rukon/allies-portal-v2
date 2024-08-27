"use client"
import Panel from '@/components/widget/panel';
import CreateBroker from '../../../components/broker/CreateBroker';
import { useEffect } from 'react';
import Helper from '@/inc/Helper';
const Page = (props) => {
    useEffect(() => {
        Helper.setPageData({
            title:'Create Broker ',
            pageTitle:'Create Broker ',
        })
    });
    return(
        <Panel>
            <div className='row'>
                <div className='col-xs-12 col-sm-8 col-md-6'>
                    <CreateBroker/>
                </div>
            </div>

            
        </Panel>
    ) 
}
export default Page;