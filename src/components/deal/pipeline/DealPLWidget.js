import Api from '@/inc/Api';
import Helper from '@/inc/Helper';
import Link from 'next/link';
import React, { Component } from 'react';

const DealPLWidget = ({deal,onDealChange}) => {
    const getRepoNames = () => {
        let names = [];
        if(deal.is_buyer_rep == 'yes'){
            names.push('BR')
        }
        if(deal.is_tenant_rep == 'yes'){
            names.push('TR')
        }
        if(deal.is_landlord_rep == 'yes'){
            names.push('LR')
        }
        if(deal.is_seller_rep == 'yes'){
            names.push('SR')
        }
        return names.join('/');
    }
    let getTitle = () => {
        if(deal.is_landlord_rep == 'yes' ||  deal.is_seller_rep == 'yes'){
            return deal.deal_id;
        }
        let title = '';
        if(deal.company){
            title = deal.company.name
        }
        return title;
    }
    let getShortDetails = () => {
        if(deal.is_buyer_rep == 'yes' ||  deal.is_tenant_rep == 'yes'){
            let tr_br_data = deal.tr_br_data;
            return(
                <>
                Budget : {tr_br_data.rate_range_from} {tr_br_data.rate_range_to ? ' - ' + tr_br_data.rate_range_to : ''} {tr_br_data.lease_term} <br/>
                Building SF : {tr_br_data.buyer_sf_from} {tr_br_data.buyer_sf_to ? ' - ' + tr_br_data.buyer_sf_to : ''}   SF<br/>
                Size : {tr_br_data.size_range_from} - {tr_br_data.size_range_to} {tr_br_data?.size}<br/>
                Zoning : {tr_br_data?.zoning}
                </>
            );
        }
        let lr_sr_data = deal.lr_sr_data ? deal.lr_sr_data : {};
        return(
            <>
            Asking Rate - {lr_sr_data.asking_price} {lr_sr_data.psf} NNN <br/>
            Building SF - 10,000 SF <br/>
            Size - 1.49 acres<br/>
            Zoning - I-4
            </>
        )
    }
    const updateDealStage = (deal_stage) => {
        let api = Api;
        api.setUserToken();
        api.axios().post('/deal/update-stage',{deal_stage:deal_stage,deal_id:deal.deal_id}).then(res=> {
            if(res.data.type){
                Helper.alert(res.data.message)
                onDealChange()
            }else{
                Helper.alert(res.data.message,{className:"error"})
            }
           
        })
    }
    const onPrevBtnClick = () => {
        let allDealStage = Helper.getDealStage();
        let currentDealStage = allDealStage.find( item => { return item.id == deal.deal_stage});
        let prevDealStage = currentDealStage;
        allDealStage.forEach((item,key) => {
            if((item.sn == currentDealStage.sn) && key >=1){
                prevDealStage = allDealStage[key - 1]
            }
        });
        if(currentDealStage.id == prevDealStage.id){
            return;
        }
        updateDealStage(prevDealStage.id )
    }
    const onNextBtnClick = () => {
        let allDealStage = Helper.getDealStage();
        let currentDealStage = allDealStage.find( item => { return item.id == deal.deal_stage});
        let nexDealStage = currentDealStage;
        let totalItems = allDealStage.length;
        allDealStage.forEach((item,key) => {
            if( (item.sn == currentDealStage.sn) && (key + 1) < totalItems ){
                nexDealStage = allDealStage[key + 1]
            }
        });
        if(currentDealStage.id == nexDealStage.id){
            return;
        }
        updateDealStage(nexDealStage.id )
    }
    return (
        <div className='dp_widget'>
            <Link href={'/deals/edit/'+deal.deal_id} className='dpw_title'>{getTitle()}</Link>
            <div className='dpw_contents'>
                {getShortDetails()}
            </div>
            <div className='dpw_footer'>
                <div className='arrow_left'>
                    <span className='btn' onClick={onPrevBtnClick}><img src="/images/icons/arrow-left.png"/></span>
                </div>
                <div className='repo_name'><span>{getRepoNames()}</span></div>
                <div className='arrow_right'>
                    <span className='btn' onClick={onNextBtnClick}><img src="/images/icons/arrow-right.png"/></span>
                </div>
            </div>
        </div>
    )
}

export default DealPLWidget;