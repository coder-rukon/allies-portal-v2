'use client'
import { Component } from "react";
import Panel from "@/components/widget/panel";
import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import RsGrid from "@/components/grid/rsgrid";
class AllProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiablePropertyType:{
                office:true,
                industrial:true,   
                retail:false,   
                land:false,   
            }
        }
    }
    onSearchChangeHandler(event){

    }
    propertyTypeButtonClickHandler(pType,event){
        let visiablePropertyType = this.state.visiablePropertyType;
        visiablePropertyType[pType] = !visiablePropertyType[pType];
        this.setState({
            visiablePropertyType:visiablePropertyType
        })
    }
    getPropertyGrid(gridId,pType,title){
        let gridData = [{property_address:'Dhaka,Bangladesh'},{property_address:'Dhaka,Bangladesh'},{property_address:'Dhaka,Bangladesh'}]
        let gridheader = [
            {id:'property_address',title:'PROPERTY ADDRESS',width:'100px',cellRender:(item) => { return item.property_address? item.property_address:''  }},
            {id:'title',title:'SIZE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_title:''  }},
            {id:'phone',title:'ACRES',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_phone:''  }},
            {id:'email',title:'DOCK DOORS',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'DRIVE-IN',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'CLEAR HEIGHT',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'YEAR BUILT',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'VALUE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }},
            {id:'email',title:'LEASE RATE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_email:''  }}
        ]
        return(
            <div className="property_grid_section">
                <div className="pg_header">
                    <span className="pg_title">{title}</span>
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
                <RsGrid id={gridId} header={gridheader} data={gridData}/>
            </div>
        )
    }
    render() { 
        
        let visiablePropertyType = this.state.visiablePropertyType;
        return ( 
            <div className="property_list_page">
                <Panel>
                    <div className="topfilter_section">
                        <div className="left_items">
                            <div className="form_s">
                                <Input name="search" placeholder="Search property" onChange={ this.onSearchChangeHandler.bind(this) }/>
                            </div>
                            <div>
                                <Button label="Industrial" onClick={this.propertyTypeButtonClickHandler.bind(this,'industrial')} className={!visiablePropertyType.industrial ? "bordered" : ''}/>
                            </div>
                            <div>
                                <Button label="Office"  onClick={this.propertyTypeButtonClickHandler.bind(this,'office')} className={!visiablePropertyType.office ? "bordered" : ''}/>
                            </div>
                            <div>
                                <Button label="Retail"  onClick={this.propertyTypeButtonClickHandler.bind(this,'retail')} className={!visiablePropertyType.retail ? "bordered" : ''}/>
                            </div>
                            <div>
                                <Button label="Land"  onClick={this.propertyTypeButtonClickHandler.bind(this,'land')} className={!visiablePropertyType.land ? "bordered" : ''}/>
                            </div>
                        </div>
                        <div className="right_items">
                            <Button href="/property/create" label="+ Add property"/>
                        </div>
                    </div>
                    {visiablePropertyType.industrial ? this.getPropertyGrid('industrial_grid','industrial','Industrial') : ''}
                    {visiablePropertyType.office ? this.getPropertyGrid('office_grid','office','Office') : ''}
                    {visiablePropertyType.retail ? this.getPropertyGrid('retail_grid','retail','Retail') : ''}
                    {visiablePropertyType.land ? this.getPropertyGrid('land_grid','land','Land') : ''}
                </Panel>
            </div>
        );
    }
}
 
export default AllProperty;