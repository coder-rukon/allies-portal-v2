'use client'
import { Component } from "react";
import Panel from "@/components/widget/panel";
import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
class AllProperty extends Component {
    constructor(props) {
        super(props);
    }
    onSearchChangeHandler(event){

    }
    render() { 
        let gridData = []
        let gridheader = [
            {
                id:'star',title:'<span class="material-symbols-outlined">star_rate</span>',style:{width:'50px'},
                
            },
            {id:'contact_name',title:'PROPERTY ADDRESS',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_name:''  }},
            {id:'title',title:'SIZE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_title:''  }},
            {id:'phone',title:'ACRES',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_phone:''  }},
            {id:'email',title:'DOCK DOORS',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'DRIVE-IN',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'CLEAR HEIGHT',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'YEAR BUILT',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'VALUE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'LEASE RATE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }}
        ]
        return ( 
            <div className="property_list_page">
                <Panel>
                    <div className="topfilter_section">
                        <div className="left_items">
                            <div className="form_s">
                                <Input name="search" placeholder="Search property" onChange={ this.onSearchChangeHandler.bind(this) }/>
                            </div>
                            <div>
                                <Button label="Industrial"/>
                            </div>
                            <div>
                                <Button label="Office"/>
                            </div>
                            <div>
                                <Button label="Retail"/>
                            </div>
                            <div>
                                <Button label="Land"/>
                            </div>
                        </div>
                        <div className="right_items">
                            <Button href="/property/create" label="+ Add property"/>
                        </div>
                    </div>
                    <div className="property_grid_section">
                        <div className="pg_header">
                            <span className="pg_title">Industrial</span>
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
                        <RsGrid header={gridheader} data={gridData}/>
                    </div>
                    <div className="property_grid_section">
                        <div className="pg_header">
                            <span className="pg_title">Office</span>
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
                        <RsGrid header={gridheader} data={gridData}/>
                    </div>
                    
                </Panel>
            </div>
        );
    }
}
 
export default AllProperty;