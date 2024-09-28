import React, { Component } from 'react';
import DealStageTopBar from '../../../../components/deal/edit/DealStageTopBar';
import Panel from '@/components/widget/panel';
import BorderBox from '@/components/widget/borderbox';
import Helper from '@/inc/Helper';
import Notes from '@/components/notes/Notes';
import FileUploader from '@/components/widget/FileUploader';
class EditDealPage extends Component {
    componentDidMount(){
        Helper.setPageData({
            pageTitle:'LR 7583 E 59th St 01-23-24',
            title:'Edit Deal | LR 7583 E 59th St 01-23-24'
        })
    }
    render() {
        let deal = {};
        let isDisable = false;
        return (
            <div className='edit_deal_page'>
                <Panel>
                    <DealStageTopBar deal={deal}/>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <BorderBox title="Company Details">

                            </BorderBox>
                            <BorderBox title="Property Details">

                            </BorderBox>
                            <BorderBox title="Additional Property Details">

                            </BorderBox>
                            <BorderBox title="Lease Details">

                            </BorderBox>
                            <BorderBox title="Deal Details">

                            </BorderBox>
                        </div>
                        <div className='col-xs-12 col-sm-6'>
                            <BorderBox title="Notes">
                                <Notes  disable={isDisable} source="deal" integrator={1}/> 
                            </BorderBox>
                            <BorderBox title="Files">
                                <FileUploader source="deal_files" integrator={1} disable={isDisable} id="upload_files"/>
                            </BorderBox>
                            <BorderBox title="Team Access">

                            </BorderBox>
                            <BorderBox title="Activity">

                            </BorderBox>
                        </div>
                    </div>
                    
                </Panel>
                
            </div>
        );
    }
}

export default EditDealPage;