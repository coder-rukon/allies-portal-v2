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
import Api from '@/inc/Api';
import ErrorMessage from '@/components/widget/errormessage';
import Loading from '@/components/widget/Loading';
class EditDealPage extends Component {
    constructor(props){
        super(props);
        this.additionalFieldsObj = null;
        this.state = {
            deal:null,
            loadingDeal:false,
            dealNotFoundMessage:null
        }
    }
    componentDidMount(){
        
        this.loadDeal()
    }
    loadDeal(){
        let api = Api, that = this;
        that.setState({
            deal:null,
            dealNotFoundMessage:null,
            loadingDeal:true
        })
        api.axios().get('/deal/details/'+this.props.deal_id).then(res=>{
            console.log(res)
            if(!res.data.type){
                that.setState({
                    deal:null,
                    dealNotFoundMessage:res.data.message,
                    loadingDeal:false
                })
                Helper.setPageData({
                    pageTitle:'404!',
                    title:'404! Error'
                })
                
            }else{
                that.setState({
                    deal:res.data.data.deal,
                    dealNotFoundMessage:null,
                    loadingDeal:false
                })
                Helper.setPageData({
                    pageTitle:'LR 7583 E 59th St 01-23-24',
                    title:'Edit Deal | LR 7583 E 59th St 01-23-24'
                })
            }
            
        })
    }

    render() {
        if(this.state.loadingDeal){
            return(
                <div className='edit_deal_page text-center'>
                    <Loading/>
                </div>
            )
        }
        if(!this.state.deal){
            return(
                <div className='edit_deal_page'>
                    <ErrorMessage error={this.state.dealNotFoundMessage} />
                </div>
            )
        }
        let deal = this.state.deal;
        let property = deal.property ? deal.property : {};
        let company = deal.company ? deal.company : {};
        let isDisable = false;
        return (
            <div className='edit_deal_page'>
                <Panel>
                    <DealStageTopBar deal={deal}/>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <DealCompanyDetails deal_id={deal.deal_id} company={company}/>
                            <BorderBox title="Property Details">
                                <PropertyDetails property={property} />
                            </BorderBox>
                            <BorderBox title="Additional Property Details">
                                <AdditionalFields disable={isDisable} property={property} onReady={obj => { this.additionalFieldsObj = obj }}/>
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
                                <FileUploader source="deal" integrator={deal.deal_id} disable={isDisable} id="upload_files"/>
                            </BorderBox>
                            
                        </div>
                    </div>
                    
                </Panel>
                
            </div>
        );
    }
}

export default EditDealPage;