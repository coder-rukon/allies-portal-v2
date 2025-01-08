import React, { Component } from 'react';
import BorderBox from '@/components/widget/borderbox';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/button';
class DealCompanyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: {},
            deal:{}
        }
        this.dbDeal = this.props.deal;
    }
    componentDidMount(){
        this.dbDeal = this.props.deal;
        this.setState({
            company:this.props.company,
            deal:this.props.deal
        })
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    getData(){
        return this.state.company;
    }
    setData(company){
        this.setState({
            company:company
        })
    }
    getDeal(){
        return this.state.deal;
    }
    onChangeHandler(event){
        let company = this.state.company;
        this.setState({
            company:{
                ...company,
                [event.target.name] : event.target.value
            }
        })
    }
    onLrSrBtnClickHanlder(button_id){
        let deal = this.state.deal;
        if(button_id == 'is_landlord_rep' &&  deal.is_landlord_rep == 'yes' && deal.is_seller_rep =='no'){
            return;
        }
        if(button_id == 'is_seller_rep' &&  deal.is_seller_rep == 'yes' && deal.is_landlord_rep =='no'){
            return;
        }
        this.setState({
            deal:{
                ...deal,
                [button_id]: deal[button_id] == 'yes' ? 'no' : 'yes'
            }
        })
        
    }
    btnLrSr(){
        if(this.dbDeal.is_landlord_rep =='no' && this.dbDeal.is_seller_rep == 'no'){
            return <></>
        }
        let deal = this.state.deal;
        return(
            <>
            <Button label="Landlord Rep" className={deal.is_landlord_rep == 'no' ? 'inactive' : '' }  onClick={ e => this.onLrSrBtnClickHanlder('is_landlord_rep')}/>
            <Button label="Seller Rep" className={deal.is_seller_rep == 'no' ? 'inactive' : '' } onClick={ e => this.onLrSrBtnClickHanlder('is_seller_rep')}/>
            </>
        )
    }
    onBrTrBtnClickHanlder(button_id){
        let deal = this.state.deal;
        if(button_id == 'is_tenant_rep' &&  deal.is_tenant_rep == 'yes' && deal.is_buyer_rep =='no'){
            return;
        }
        if(button_id == 'is_buyer_rep' &&  deal.is_buyer_rep == 'yes' && deal.is_tenant_rep =='no'){
            return;
        }
        this.setState({
            deal:{
                ...deal,
                [button_id]: deal[button_id] == 'yes' ? 'no' : 'yes'
            }
        })
        
    }
    btnTrBr(){
        if(this.dbDeal.is_tenant_rep =='no' && this.dbDeal.is_buyer_rep == 'no'){
            return <></>
        }
        let deal = this.state.deal;
        return(
            <>
                <Button label="Tenant Rep" className={deal.is_tenant_rep == 'no' ? 'inactive' : '' } onClick={ e => this.onBrTrBtnClickHanlder('is_tenant_rep')}/>
                <Button label="Buyer Rep" className={deal.is_buyer_rep == 'no' ? 'inactive' : '' }  onClick={ e => this.onBrTrBtnClickHanlder('is_buyer_rep')} />
            </>
        )
    }
    render() {
        let company = this.state.company;
        return (
            <BorderBox title="Company Details">
                <div className='d-flex gap-2 mb-3'>
                    {this.btnLrSr()}
                    {this.btnTrBr()}
                </div>
                <div className='row frm_company'>
                    <Input value={company?.name} name="name" label="Company" className="col-sm-6 col-xs-12" onChange={this.onChangeHandler.bind(this)} />
                    <Input value={company?.website} name="website" label="Website" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_name} name="contact_name" label="Contact Name" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_title} name="contact_title" label="Title" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_email} name="contact_email"  label="Email" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_phone} name="contact_phone" label="Phone" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                </div>
                {company.company_id ? <Button href={'/company/details/'+company.company_id} label="Open Company Profile" className="block"/> : '' }
            </BorderBox>
        );
    }
}

export default DealCompanyDetails;