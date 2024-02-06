"use client"
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
import Link from "next/link";
let CompanyList = (props) => {
    let gridheader = [
        {
            id:'star',title:'<span class="material-symbols-outlined">star_rate</span>',style:{width:'50px'},
            
        },
        {
            id:'company_name',title:'COMPANY NAME',style:{width:'100px'},
            cellRender: (cellData) => {
                return <Link href={'/company/details/'+cellData.id}>{cellData.company_name}</Link>
            }
        },
        {id:'contact_name',title:'CONTACT NAME',width:'100px'},
        {id:'title',title:'TITLE',width:'100px'},
        {id:'phone',title:'PHONE',width:'100px'},
        {id:'email',title:'EMAIL',width:'100px'}
    ]
    let gridData = [
        {
            id:1,
            star:<span className="material-symbols-outlined">star_rate</span>,
            company_name: "First Holdings" ,
            contact_name:'Jamie Doe',
            title:'CEO',
            phone:'(555) 134-5643',
            email:'jamie@firstholdings.com'
        },
        {
            id:2,
            star:<span className="material-symbols-outlined">star_rate</span>,
            company_name:'First Holdings',
            contact_name:'Jamie Doe',
            title:'CEO',
            phone:'(555) 134-5643',
            email:'jamie@firstholdings.com'
        }
    ]
    return(
        <div className="company_list_page">
            <div className="filter_and_search">
                <div className="left_side">
                    <div className="form_s">
                        <Input name="search" placeholder="Search company"/>
                    </div>

                </div>
                <div className="right_side">
                    <Button label="New company" href="/company/new-company"/>
                </div>
            </div>
            <RsGrid header={gridheader} data={gridData}/>
        </div>
    )
}
export default CompanyList