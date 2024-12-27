import Input from '@/components/forms/Input';
import BorderBox from '@/components/widget/borderbox';
import Api from '@/inc/Api';
import React, { Component } from 'react';

class DealCreateCompayForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:{},
            companyNameList:[]
        }
        this.apiCallTimeOut = null;
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    getData(){
        return this.state.company;
    }
    onDropdownItemClick(company){
        this.setState({
            company:company,
            companyNameList:[]
        })
    }
    companyNameListDropdown(){
        if(this.state.companyNameList.length <= 0){
            return <></>
        }
        return(
            <div className="dropdown-menu show">
                {
                    this.state.companyNameList.map( (comapny,key) => {
                        return (
                            <div className="dropdown-item" key={key} onClick={ this.onDropdownItemClick.bind(this,comapny)}>
                                <strong>{comapny.company_name}</strong>{comapny.contact ? ', '+comapny.contact : ''} {comapny.contact_title ? ', '+comapny.contact_title : ''}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    onCompanyChangeHandler(event){
        let company = this.state.company;
        this.setState({
            company:{
                ...company,
                [event.target.name] : event.target.value
            }
        })
        if(event.target.name == 'company_name'){
            let api = Api;
            let that = this;
            api.setUserToken();
            let data = {
                s:event.target.value
            }
            this.setState({
                companyNameList:[]
            })
            clearTimeout(this.apiCallTimeOut);
            this.apiCallTimeOut = setTimeout( () => {
                api.axios().post('/company/my-company-list',data).then(res => {
                    if(res.data.type){
                        that.setState({
                            companyNameList: res.data.data.company.data.map(  company => {
                                return {
                                    company_id: company.company_id,
                                    company_name: company.name,
                                    contact: company.company_contact?.contact_name,
                                    title: company.company_contact?.contact_title,
                                    phone: company.company_contact?.contact_phone,
                                    email: company.company_contact?.contact_email
                                }
                            })
                        })
                    }
                })
            }, 300)
            
        }
    }
    render() {
        let company = this.state.company;
        return (
            <BorderBox title="Company Information">
                <div className='d-flex gap-3 justify-content-between'>
                    <div className='dropdown_wraper'>
                        <Input name="company_name" value={company.company_name} label="Company name" onChange={ this.onCompanyChangeHandler.bind(this)} className="company_create_col"/>
                        {
                            this.companyNameListDropdown()
                        }
                    </div>
                    <Input name="contact" value={company.contact} label="Contact" onChange={ this.onCompanyChangeHandler.bind(this)}  className="company_create_col"/>
                    <Input name="title" value={company.title} label="Title" onChange={ this.onCompanyChangeHandler.bind(this)}  className="company_create_col"/>
                    <Input name="phone" value={company.phone} label="Phone" onChange={ this.onCompanyChangeHandler.bind(this)}  className="company_create_col"/>
                    <Input name="email" value={company.email} label="Email" onChange={ this.onCompanyChangeHandler.bind(this)}  className="company_create_col"/>
                </div>
            </BorderBox>
        );
    }
}

export default DealCreateCompayForm;