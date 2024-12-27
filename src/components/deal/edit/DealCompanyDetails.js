import React, { Component } from 'react';
import BorderBox from '@/components/widget/borderbox';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/button';
class DealCompanyDetails extends Component {
    render() {
        return (
            <BorderBox title="Company Details">
                <div className='d-flex gap-2 mb-3'>
                    <Button label="Landlord Rep" />
                    <Button label="Seller Rep" className="inactive"/>
                </div>
                <div className='row frm_company'>
                    <Input name="company_name" label="Company" className="col-sm-6 col-xs-12" />
                    <Input name="website" label="Website" className="col-sm-6 col-xs-12" />
                    <Input name="website" label="Contact Name" className="col-sm-6 col-xs-12" />
                    <Input name="website" label="Title" className="col-sm-6 col-xs-12" />
                    <Input name="website" label="Email" className="col-sm-6 col-xs-12" />
                    <Input name="website" label="Phone" className="col-sm-6 col-xs-12" />
                </div>
                <Button label="Open Company Profile" className="block"/>
            </BorderBox>
        );
    }
}

export default DealCompanyDetails;