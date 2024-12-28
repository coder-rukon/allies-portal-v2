import React, { Component } from 'react';
import BorderBox from '@/components/widget/borderbox';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/button';
class DealCompanyDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: {}
        }
    }
    componentDidMount(){
        this.setState({
            company:this.props.company
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
    onChangeHandler(event){
        let company = this.state.company;
        this.setState({
            company:{
                ...company,
                [event.target.name] : event.target.value
            }
        })
    }
    render() {
        let company = this.state.company;
        return (
            <BorderBox title="Company Details">
                <div className='d-flex gap-2 mb-3'>
                    <Button label="Landlord Rep" />
                    <Button label="Seller Rep" className="inactive"/>
                </div>
                <div className='row frm_company'>
                    <Input value={company?.name} name="name" label="Company" className="col-sm-6 col-xs-12" onChange={this.onChangeHandler.bind(this)} />
                    <Input value={company?.website} name="website" label="Website" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_name} name="contact_name" label="Contact Name" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_title} name="contact_title" label="Title" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_email} name="contact_email"  label="Email" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                    <Input value={company?.contact_phone} name="contact_phone" label="Phone" className="col-sm-6 col-xs-12"  onChange={this.onChangeHandler.bind(this)}  />
                </div>
                <Button href={'/company/details/'+company.company_id} label="Open Company Profile" className="block"/>
            </BorderBox>
        );
    }
}

export default DealCompanyDetails;