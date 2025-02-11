import React, { Component } from 'react';
import DealStageTopBar from '../../../../components/deal/edit/DealStageTopBar';
import Panel from '@/components/widget/panel';
import BorderBox from '@/components/widget/borderbox';
import DealCompanyDetails from '@/components/deal/edit/DealCompanyDetails';
import DealDetails from '@/components/deal/edit/DealDetails';
import LeaseDetails from '@/components/deal/edit/LeaseDetails';
import DealPropertyRequirements from '@/components/deal/edit/DealPropertyRequirements';
import DealTenantCriteria from '@/components/deal/edit/DealTenantCriteria';
import DealBuyerCriteria from '@/components/deal/edit/DealBuyerCriteria';
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
            editMode:true,
            isSaving:false,
            deal:null,
            loadingDeal:false,
            dealNotFoundMessage:null
        }
        this.sahredAccess = null;
        this.dealCompanyObj = null;
        this.propertyRequirementsComponent = null;
        this.dealTenantCriteriaComponent = null;
        this.dealBuyerCriteriaComponent = null;
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
        this.setState({
            editMode:true
        })
    } 
    onSaveClick(){
        let deal = this.state.deal;
        let that = this, api = Api;
        api.setUserToken();
        that.setState({
            isSaving:true
        })
        if(this.dealCompanyObj){
            deal.company = this.dealCompanyObj.getData();
            let dealInsideCompanyDetails = this.dealCompanyObj.getDeal();
            deal.is_landlord_rep = dealInsideCompanyDetails?.is_landlord_rep;
            deal.is_seller_rep = dealInsideCompanyDetails?.is_seller_rep;
            deal.is_tenant_rep = dealInsideCompanyDetails?.is_tenant_rep;
            deal.is_buyer_rep = dealInsideCompanyDetails?.is_buyer_rep;
        }
        if(this.additionalFieldsObj){
            deal.property = {
                ...deal.property,
                ...this.additionalFieldsObj.getData()
            }
        }
        if(this.propertyRequirementsComponent){
            deal.property_requirements = this.propertyRequirementsComponent.getData()
        }
        if(this.dealTenantCriteriaComponent){
            deal.tenant_criteria = this.dealTenantCriteriaComponent.getData()
        }
        if(this.dealBuyerCriteriaComponent){
            deal.buyer_criteria = this.dealBuyerCriteriaComponent.getData()
        }
        delete deal.tr_br_data;
        api.axios().post('/deal/update',deal).then(res => {
            if(res.data.type){
                Helper.alert(res.data.message)
            }else{
                res.data.errors.forEach( resData => {
                    Helper.alert(resData,{className:'error'});
                })
            }

            that.setState({
                isSaving:false
            })
        })
    }
    onRepBtnChangeHandler(button_id){
        let deal = this.state.deal;
        this.setState({
            deal:{
                ...deal,
                [button_id]: deal[button_id] == 'yes' ? 'no' : 'yes'
            }
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
        let tr_br_data = deal.tr_br_data ? deal.tr_br_data : {};
        let company = deal.company ? deal.company : {};
        let isDisable = false;
        let editMode = this.state.editMode;
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
                            <DealCompanyDetails onRepBtnChange = { this.onRepBtnChangeHandler.bind(this)} deal={deal} onReady={ dealCompanyDetails => { this.dealCompanyObj = dealCompanyDetails }} company={company}/>
                            {(deal.is_landlord_rep == 'yes' || deal.is_seller_rep == 'yes'  ) ? <BorderBox title="Property Details"> <PropertyDetails property={property} /></BorderBox> : ''}
                            {(deal.is_tenant_rep == 'yes' || deal.is_buyer_rep == 'yes'  ) ? <BorderBox title="Property Requirements"> <DealPropertyRequirements onReady={obj => this.propertyRequirementsComponent = obj } data={tr_br_data} /></BorderBox> : ''}
                            {(deal.is_tenant_rep == 'yes'  ) ? <BorderBox title="Tenant Criteria"> <DealTenantCriteria data={tr_br_data} onReady={obj => this.dealTenantCriteriaComponent = obj } /></BorderBox> : ''}
                            {(deal.is_buyer_rep == 'yes'  ) ? <BorderBox title="Buyer Criteria"> <DealBuyerCriteria data={tr_br_data} onReady={obj => this.dealBuyerCriteriaComponent = obj } /></BorderBox> : ''}
                            <BorderBox title="Additional Property Details">
                                <AdditionalFields disable={isDisable} property={property} onReady={obj => { this.additionalFieldsObj = obj }}/>
                            </BorderBox>
                            {deal.is_landlord_rep == 'yes' ? <BorderBox title="Lease Details"> <LeaseDetails /> </BorderBox> : ''}
                            {(deal.is_landlord_rep == 'yes' || deal.is_seller_rep == 'yes'  ) ? <BorderBox title="Deal Details"> <DealDetails /> </BorderBox> : ''}
                        </div>
                        <div className='col-xs-12 col-sm-6'>
                            {deal.deal_id ? <ActivityList disable={isDisable} integrator={deal.deal_id} source="deal"/> : '' }
                            <BorderBox title="Notes">
                                <Notes disable={isDisable} source="deal" integrator={deal.deal_id}/> 
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