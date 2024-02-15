"use client"
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
import Loading from "@/components/widget/Loading";
import Panel from "@/components/widget/panel";
import Api from "@/inc/Api";
import Link from "next/link";
import { Component } from "react";

class CompanyList  extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyList:[],
            isLoading:false
        }
        this.sChangeHandler = null;
    }
    componentDidMount(){
        this.loadCompany();
    }
    loadCompany(s = null){
        this.setState({
            isLoading:true
        })
        let api = Api;
        let that = this;
        let sUrl = '/company/my-company-list';
        if(s){
            sUrl += '?s='+s;
        }
        if(api.setUserToken()){
            api.axios().get(sUrl).then(res => {
                that.setState({
                    isLoading:false,
                    companyList:res.data.data.company.data
                })
            }).catch(error => {
                that.setState({
                    isLoading:false
                })
            })
        }
    }
    onSearchChangeHandler(event){
        let that = this;
        clearTimeout(this.sChangeHandler);
        this.sChangeHandler = setTimeout(function(){
            that.loadCompany(event.target.value);
        },300);
    }
    render(){

        let gridheader = [
            {
                id:'star',title:'<span class="material-symbols-outlined">star_rate</span>',style:{width:'50px'},
                
            },
            {
                id:'name',title:'COMPANY NAME',style:{width:'190px'},
                cellRender: (cellData) => {
                    return <div className="item_data"><Link href={'/company/details/'+cellData.company_id}>{cellData.name}</Link></div>
                }
            },
            {id:'contact_name',title:'CONTACT NAME',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_name:''  }},
            {id:'title',title:'TITLE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_title:''  }},
            {id:'phone',title:'PHONE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_phone:''  }},
            {id:'email',title:'EMAIL',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }}
        ]
        let gridData =  this.state.companyList;
        return(
            <div className="company_list_page">
                <Panel>
                    <div className="filter_and_search">
                        <div className="left_side">
                            <div className="form_s">
                                <Input name="search" placeholder="Search company, name, etc." onChange={ this.onSearchChangeHandler.bind(this) }/>
                            </div>
                            <div>
                                <div className="rs_dropdown">
                                    <Button label="View" icon='arrow_drop_down'/>
                                    <ul>
                                        <li className="checked"><span className="material-symbols-outlined rs_check">done</span> Company Name</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Website</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Industry</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Sub-Industry</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Contact Name</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Title</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Phone</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Email</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Address</li>
                                        <li><span className="material-symbols-outlined rs_check">done</span> Lead Capture</li>
                                    </ul>
                                </div>
                            </div>
                            
    
                        </div>
                        <div className="right_side">
                            <Button label="+ Add company" href="/company/new-company"/>
                        </div>
                    </div>
                    <RsGrid header={gridheader} data={gridData}/>
                    <div className="mt-2 mb-2 text-center">
                       {this.state.isLoading ? <Loading/> : '' }
                    </div>
                </Panel>
                
            </div>
        ) 
    }
    
}
export default CompanyList