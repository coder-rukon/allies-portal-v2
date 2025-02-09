import React, { Component } from 'react';
import DealStageTopBar from '../../../../components/deal/edit/DealStageTopBar';
import Panel from '@/components/widget/panel';
import BorderBox from '@/components/widget/borderbox';
import DealCompanyDetails from '@/components/deal/edit/DealCompanyDetails';
import DealDetails from '@/components/deal/edit/DealDetails';
import LeaseDetails from '@/components/deal/edit/LeaseDetails';
import DealPropertyRequirements from '@/components/deal/edit/DealPropertyRequirements';
import DealTenantCritera from '@/components/deal/edit/DealTenantCritera';
import PropertyDetails from '@/components/deal/edit/PropertyDetails';
import Helper from '@/inc/Helper';
import Notes from '@/components/notes/Notes';
import FileUploader from '@/components/widget/FileUploader';
import AdditionalFields from '@/components/property/AdditionalFields';
import ActivityList from "@/components/activity/ActivityList";
import Api from '@/inc/Api';
import ErrorMessage from '@/components/widget/errormessage';
import Loading from '@/components/widget/Loading';
import Button from '@/components/forms/button';
import FooterSticky from "@/components/widget/FooterSticky";
import ShareAccessBtn from "@/components/ShareAccess/ShareAccessBtn";
class EditDealPage extends Component {
    constructor(props){
        super(props);
        this.additionalFieldsObj = null;
        this.state = {
            isSaving:false,
            deal:null,
            loadingDeal:false,
            dealNotFoundMessage:null
        }
        this.sahredAccess = null;
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
    isTrBr(){
        let deal = this.state.deal;
        if(deal.is_tenant_rep =='yes' || deal.is_buyer_rep == 'yes'){
            return true;
        }
        return false;
    }
    onDealStageChangeHandler(stage_id){
        let deal = this.state.deal;
        this.setState({
            deal:{
                ...deal,
                deal_stage:stage_id
            }
        })
    }
    onEditIconClick(){

    } 
    onSaveClick(){
        let deal = this.state.deal;
        let that = this, api = Api;
        api.setUserToken();
        that.setState({
            isSaving:true
        })
        api.axios().post('/deal/update',deal).then(res => {
            console.log(res);
            that.setState({
                isSaving:false
            })
        })
    }
    render() {
        if(this.state.loadingDeal){
            return(
                <div className='edit_deal_page edit_deal_page text-center'>
                    <Loading/>
                </div>
            )
        }
        if(!this.state.deal){
            return(
                <div className='edit_deal_page edit_deal_page'>
                    <ErrorMessage error={this.state.dealNotFoundMessage} />
                </div>
            )
        }
        let deal = this.state.deal;
        let property = deal.property ? deal.property : {};
        let company = deal.company ? deal.company : {};
        let isDisable = false;
        let editMode = false;
        console.log(deal);
        return (
            <div className={ 'edit_deal_page edit_deal_page' + ( this.isTrBr() ? ' theme_2 ' : '')  }>
                <Panel>
                    <div className="pannel_header">
                        <div>
                            <DealStageTopBar deal={deal} onChange={ this.onDealStageChangeHandler.bind(this)}/>
                        </div>
                        <div className="d-flex gap-2">
                            {this.state.isSaving ? <Loading/> : ''}
                            <Button onClick={ this.onSaveClick.bind(this) }  className="md" beforeIcon="save" label= {"Save"}/>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6'>
                            <DealCompanyDetails deal={deal} company={company}/>
                            {(deal.is_landlord_rep == 'yes' || deal.is_seller_rep == 'yes'  ) ? <BorderBox title="Property Details"> <PropertyDetails property={property} /></BorderBox> : ''}
                            {(deal.is_tenant_rep == 'yes' || deal.is_buyer_rep == 'yes'  ) ? <BorderBox title="Property Requirements"> <DealPropertyRequirements property={property} /></BorderBox> : ''}
                            {(deal.is_tenant_rep == 'yes'  ) ? <BorderBox title="Tenant Critera"> <DealTenantCritera property={property} /></BorderBox> : ''}
                            <BorderBox title="Additional Property Details">
                                <AdditionalFields disable={isDisable} property={property} onReady={obj => { this.additionalFieldsObj = obj }}/>
                            </BorderBox>
                            {deal.is_landlord_rep == 'yes' ? <BorderBox title="Lease Details"> <LeaseDetails /> </BorderBox> : ''}
                            {(deal.is_landlord_rep == 'yes' || deal.is_seller_rep == 'yes'  ) ? <BorderBox title="Deal Details"> <DealDetails /> </BorderBox> : ''}
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
                    <FooterSticky>
                        <div className="">{this.state.loadingDeal ? <Loading/> : ''}</div>
                        <div className="d-flex justify-content-between gap-3">
                            <div>
                                <ShareAccessBtn disable={isDisable} onReady={ obj => { this.sahredAccess = obj }} integrator={deal.deal_id} source="deal"/>
                            </div>
                            <div>
                                {editMode ? <Button label="Save Deal" disable={isDisable} onClick={ this.onSaveClick.bind(this) } /> : <Button  onClick={ this.onEditIconClick.bind(this) }  beforeIcon="border_color" label= {"Edit"}/> }
                            </div>

                        </div>
                    </FooterSticky>
                </Panel>
                
            </div>
        );
    }
}

export default EditDealPage;