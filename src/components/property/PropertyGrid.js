'use client'
import { Component } from "react";
import Button from "@/components/forms/button";
import RsGrid from "@/components/grid/rsgrid";
class PropertyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideHeaderItems:[],
        }
        this.gridObj = null;
    }
    componentDidMount(){

    }
    getHeaders(){
        let hideHeaderItems = this.state.hideHeaderItems;
        let headers = [
            {id:'property_address',title:'PROPERTY ADDRESS',width:'100px',cellRender:(item) => { return item.property_address? item.property_address:''  },hide:hideHeaderItems.includes('property_address')},
            {id:'property_size',title:'SIZE',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_title:''  },hide:hideHeaderItems.includes('property_size')},
            {id:'property_acres',title:'ACRES',width:'100px',cellRender:(item) => { return item.company_contact? item.company_contact.contact_phone:''  },hide:hideHeaderItems.includes('property_acres')},
            {id:'property_dock_doors',title:'DOCK DOORS',width:'100px',hide:hideHeaderItems.includes('property_dock_doors')},
            {id:'property_drive_in',title:'DRIVE-IN',width:'100px',hide:hideHeaderItems.includes('property_drive_in')},
            {id:'property_clear_height',title:'CLEAR HEIGHT',width:'100px',hide:hideHeaderItems.includes('property_clear_height')},
            {id:'property_year_built',title:'YEAR BUILT',width:'100px',hide:hideHeaderItems.includes('property_year_built')},
            {id:'property_value',title:'VALUE',width:'100px',hide:hideHeaderItems.includes('property_value')},
            {id:'property_lease_rate',title:'LEASE RATE',width:'100px',hide:hideHeaderItems.includes('property_lease_rate')}
        ];
        return headers;
    }
    onFilterHeaderClickHandler(hItem,event){
        let hideHeaderItemsNew  =  this.state.hideHeaderItems;
        if(hideHeaderItemsNew.includes(hItem.id)){
            hideHeaderItemsNew =  hideHeaderItemsNew.filter( (item) => {
                return item !=hItem.id
            })
        }else{
            hideHeaderItemsNew.push(hItem.id)
        }
        this.setState({
            hideHeaderItems:hideHeaderItemsNew
        })
    }
    render() { 
        let gridData = [{property_address:'Dhaka,Bangladesh'},{property_address:'Dhaka,Bangladesh'},{property_address:'Dhaka,Bangladesh'}]
        let gridheader = this.getHeaders();
        let hideHeaderItems = this.state.hideHeaderItems;
        return ( 
            <div className="property_grid_section">
                <div className="pg_header">
                    <span className="pg_title">{this.props.title}</span>
                    <div>
                        <div className="rs_dropdown">
                            <Button label="View" icon='arrow_drop_down'/>
                            <ul>
                                {
                                    gridheader.map( (headerItem,key) => {
                                        return <li className={ !hideHeaderItems.includes(headerItem.id) ? "checked" : ''} key={key} onClick={this.onFilterHeaderClickHandler.bind(this,headerItem)}><span className="material-symbols-outlined rs_check">done</span> {headerItem.title}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <RsGrid id={this.props.gridId} onGridReady={ gridObj => this.gridObj = gridObj } header={gridheader} data={gridData}/>
            </div>
         );
    }
}
 
export default PropertyGrid;