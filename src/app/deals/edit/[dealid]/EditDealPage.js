import React, { Component } from 'react';
import DealStageTopBar from '../../../../components/deal/edit/DealStageTopBar';
import Panel from '@/components/widget/panel';
import BorderBox from '@/components/widget/borderbox';
import DealCompanyDetails from '@/components/deal/edit/DealCompanyDetails';
import DealDetails from '@/components/deal/edit/DealDetails';
import LeaseDetails from '@/components/deal/edit/LeaseDetails';
import PropertyDetails from '@/components/deal/edit/PropertyDetails';
import Helper from '@/inc/Helper';
import Notes from '@/components/notes/Notes';
import FileUploader from '@/components/widget/FileUploader';
import AdditionalFields from '@/components/property/AdditionalFields';
import ActivityList from "@/components/activity/ActivityList";
class EditDealPage extends Component {
    constructor(props){
        super(props);
        this.additionalFieldsObj = null;
    }
    componentDidMount(){
        Helper.setPageData({
            pageTitle:'LR 7583 E 59th St 01-23-24',
            title:'Edit Deal | LR 7583 E 59th St 01-23-24'
        })
    }
    render() {
        let deal = {deal_id:1525};
        let property = {property_id:1};
        let isDisable = false;
        return (
            <div className='edit_deal_page'>
                <Panel>
                    <DealStageTopBar deal={deal}/>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <DealCompanyDetails deal={deal}/>
                            <BorderBox title="Property Details">
                                <PropertyDetails />
                            </BorderBox>
                            <BorderBox title="Additional Property Details">
                                {property.property_id ? <AdditionalFields disable={isDisable} property={property} onReady={obj => { this.additionalFieldsObj = obj }}/> : <Loading/>}
                            </BorderBox>
                            <BorderBox title="Lease Details">
                                <LeaseDetails />
                            </BorderBox>
                            <BorderBox title="Deal Details">
                                <DealDetails />
                            </BorderBox>
                        </div>
                        <div className='col-xs-12 col-sm-6'>
                            <BorderBox title="Activity">
                                {deal.deal_id ? <ActivityList disable={isDisable} integrator={deal.deal_id} source="deal"/> : '' }
                            </BorderBox>
                            <BorderBox title="Notes">
                                <Notes  disable={isDisable} source="deal" integrator={deal.deal_id}/> 
                            </BorderBox>
                            <BorderBox title="Files">
                                <FileUploader source="deal_files" integrator={deal.deal_id} disable={isDisable} id="upload_files"/>
                            </BorderBox>
                            
                        </div>
                    </div>
                    
                </Panel>
                
            </div>
        );
    }
}

export default EditDealPage;