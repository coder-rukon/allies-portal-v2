import React, { Component } from 'react';
import BorderBox from '../../widget/borderbox';
import AjaxSearchInput from '../../forms/AjaxSearchInput';
import Input from '../../forms/Input';
import Api from "@/inc/Api";
import Address from '@/components/address/Address';
import Loading from '@/components/widget/Loading';

class PropertyCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:{},
            company_id:null,
            loading:false,
            searching:false
        }
        this.addressComponent = null;
        this.source = this.props.source ? this.props.source : 'owner';
    }
    componentDidMount(){
        if(this.props.company_id){
            let that = this;
            this.setState({
                company_id: this.props.company_id
            },() =>{
                that.loadCompanyById();
            })
        }
    }
    loadCompanyById(){
        let api = Api;
        let companyId = this.state.company_id;
        if(api.setUserToken()){
            this.setState({
                loading:true,
                company:{}
            })
            let that = this;
            api.axios().get('/company/get/'+companyId).then(res=>{
                if(res.data.type){
                    let companyObj = res.data.data.company;
                    that.setState({
                        loading:false,
                        company:companyObj
                    })
                }else{
                    alert(res.data.message)
                    that.setState({
                        loading:false,
                        company:{}
                    })
                }
                
            }).catch(error =>{
                that.setState({
                    loading:false,
                    company:{}
                })
            })
        }
    }
    onChangeHandler(event){

    }
    onSearchItemClick(data){
        let that = this;
        this.setState({
            company_id:data.company_id
        },()=>{
            that.loadCompanyById()
        })
    }
    render() {
        let company = this.state.company;
        let disable = false;
        if(this.state.loading){
            return <BorderBox title={this.props.title}><Loading/></BorderBox>
        }
        return (
            <BorderBox title={this.props.title}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <AjaxSearchInput  disable = {disable}  name="s_company" sUrl="/company/my-company-list" filterResult = { data => { return data.company.data.map( (item => { return {...item,item_label:item.name} }) ) }  } onItemClick={this.onSearchItemClick.bind(this)} placeholder="Search existing company"/>
                    </div>
                    
                    <div className="col-xs-12 col-sm-6">
                        <Input  label="Company" name="name" value={company.name}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  label="Contact" name="contact_name" value={company.contact_name}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input label="Title" name="contact_title" value={company.contact_title}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input label="Phone" name="contact_phone" value={company.contact_phone}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input label="Website" name="contact_website" value={company.contact_website}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input  name="contact_email" label="Email" value={company.contact_email}/>
                    </div>
                    <div className="col-xs-12 col-sm-12">
                        <Address  disable={disable} source="company" integrator={company.company_id} onReady={ obj => {this.addressComponent = obj }}/>

                    </div>
                    
                </div>
            </BorderBox>
        );
    }
}

export default PropertyCompany;