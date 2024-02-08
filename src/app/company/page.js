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
    }
    componentDidMount(){
        this.loadCompany();
    }
    loadCompany(){
        this.setState({
            isLoading:true
        })
        let api = Api;
        let that = this;
        if(api.setUserToken()){
            api.axios().get('/company/my-company-list').then(res => {
                console.log(res)
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
            {id:'contact_name',title:'CONTACT NAME',width:'100px'},
            {id:'title',title:'TITLE',width:'100px'},
            {id:'phone',title:'PHONE',width:'100px'},
            {id:'email',title:'EMAIL',width:'100px'}
        ]
        let gridData =  this.state.companyList;
        return(
            <div className="company_list_page">
                <Panel>
                    <div className="filter_and_search">
                        <div className="left_side">
                            <div className="form_s">
                                <Input name="search" placeholder="Search company, name, etc."/>
                            </div>
                            <div>
                                <div className="rs_dropdown">
                                    <Button label="View" icon='arrow_drop_down'/>
                                    <ul>
                                        <li className="checked"><span class="material-symbols-outlined rs_check">done</span> Company Name</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Website</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Industry</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Sub-Industry</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Contact Name</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Title</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Phone</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Email</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Address</li>
                                        <li><span class="material-symbols-outlined rs_check">done</span> Lead Capture</li>
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