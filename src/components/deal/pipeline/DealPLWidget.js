import Link from 'next/link';
import React, { Component } from 'react';

const DealPLWidget = ({deal}) => {
    const getRepoNames = () => {
        let names = [];
        if(deal.is_buyer_rep == 'yes'){
            names.push('Buyer Repo')
        }
        if(deal.is_tenant_rep == 'yes'){
            names.push('Tenant Repo')
        }
        if(deal.is_landlord_rep == 'yes'){
            names.push('Landlord Repo')
        }
        if(deal.is_seller_rep == 'yes'){
            names.push('Seller Repo')
        }
        return names.join(', ');
    }
    let getTitle = () => {
        if(deal.is_landlord_rep == 'yes' ||  deal.is_seller_rep == 'yes'){
            return "";
        }

        return(
            <>
            
            </>
        )
    }
    let getShortDetails = () => {
        if(deal.is_buyer_rep == 'yes' ||  deal.is_tenant_rep == 'yes'){
            let tr_br_data = deal.tr_br_data;
            return(
                <>
                Asking Rate - $7.25 PSF NNN <br/>
                Building SF - 10,000 SF<br/>
                Size - {tr_br_data.size_range_from} - {tr_br_data.size_range_to} {tr_br_data?.size}<br/>
                Zoning - {tr_br_data?.zoning}
                </>
            );
        }
        return(
            <>
            ID: {deal.deal_id} <br/>
            </>
        )
    }
    return (
        <div className='dp_widget'>
            <Link href={'/deals/edit/'+deal.deal_id} className='dpw_title'>{getTitle()}7568 S Washington St</Link>
            <div className='dpw_contents'>
                {getShortDetails()}
            </div>
            <div className='dpw_footer'>
                <div className='arrow_left'>
                    <span className='btn'><img src="/images/icons/arrow-left.png"/></span>
                </div>
                <div className='repo_name'><span>{getRepoNames()}</span></div>
                <div className='arrow_right'>
                    <span className='btn'><img src="/images/icons/arrow-right.png"/></span>
                </div>
            </div>
        </div>
    )
}

export default DealPLWidget;