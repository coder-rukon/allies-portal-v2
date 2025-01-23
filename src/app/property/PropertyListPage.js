'use client'
import { Component } from "react";
import Panel from "@/components/widget/panel";
import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import PropertyGrid from '@/components/property/PropertyGrid';
import { connect } from "react-redux";
import ActionsTypes from "@/inc/ActionTypes";
class PropertyListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:null,
            visiablePropertyType:{
                office:true,
                industrial:true,   
                retail:false,   
                land:false,   
            }
        }
        this.searchTimeOut = null;
    }
    componentDidMount(){
        if(!this.props.exportable){
            this.props.setOptions({title:'Properties'})
        }
        
    }
    onSearchChangeHandler(event){
        clearTimeout(this.searchTimeOut);
        let that = this;
        this.searchTimeOut = setTimeout(()=>{
            that.setState({
                search:event.target.value
            });
        },500);
        
    }
    propertyTypeButtonClickHandler(pType,event){
        let visiablePropertyType = this.state.visiablePropertyType;
        visiablePropertyType[pType] = !visiablePropertyType[pType];
        this.setState({
            visiablePropertyType:visiablePropertyType
        })
    }
    getPropertyGrid(gridId,pType,title){
        
        return(
            <PropertyGrid header={this.getHeader(pType)} search={this.state.search} onPropertyClick={ this.props?.onPropertyClick } gridId={gridId} propertyType={pType} title={title}/>
        )
    }
    getHeader(type){
        let gridHeader ={
            industrial:[
                {id:'property_size',title:'SIZE',width:'100px'},
                {id:'property_acres',title:'ACRES',width:'100px'},
                {id:'property_dock_doors',title:'# of Dock Doors',width:'100px'},
                {id:'property_drive_in_doors',title:'# of Drive-In Doors',width:'100px'},
                {id:'property_clear_height',title:'Class',width:'100px'},
                {id:'property_clear_height',title:'CLEAR HEIGHT',width:'100px'},
                {id:'property_year_built',title:'YEAR BUILT',width:'100px'},
                {id:'property_price',title:'Year Renovated',width:'100px'},
                {id:'property_price',title:'Total Parking Spaces',width:'100px'},
                {id:'property_price',title:'Power',width:'100px'},
                {id:'property_lease_rate',title:'Office Available',width:'100px'},
            ],
            office:[
                {id:'property_size',title:'SIZE',width:'100px'},
                {id:'property_acres',title:'ACRES',width:'100px'},
                {id:'property_dock_doors',title:'ZONING',width:'100px'},
                {id:'property_drive_in_doors',title:'# of Private Offices',width:'100px'},
                {id:'property_clear_height',title:'# of Bathrooms',width:'100px'},
                {id:'property_year_built',title:'# of Suites',width:'100px'},
                {id:'property_lease_rate',title:'Class',width:'100px'},
                {id:'property_lease_rate',title:'Min Space',width:'100px'},
                {id:'property_lease_rate',title:'Max Contiguous Space',width:'100px'},
                {id:'property_lease_rate',title:'Year Built',width:'100px'},
                {id:'property_lease_rate',title:'Year Renovated',width:'100px'}
            ],
            retail:[
                {id:'property_size',title:'SIZE',width:'100px'},
                {id:'property_acres',title:'ZONING',width:'100px'},
                {id:'property_dock_doors',title:'Retail Type',width:'100px'},
                {id:'property_drive_in_doors',title:'Parking Ratio',width:'100px'},
                {id:'property_clear_height',title:'Class',width:'100px'},
                {id:'property_year_built',title:'Vehicles Per Day',width:'100px'},
                {id:'property_price',title:'Year Built',width:'100px'},
                {id:'property_lease_rate',title:'Year Renovated',width:'100px'},
            ],
            land:[
                {id:'property_size',title:'SIZE',width:'100px'},
                {id:'property_acres',title:'ZONING',width:'100px'},
                {id:'property_dock_doors',title:'Traffic Count',width:'100px'},
                {id:'property_drive_in_doors',title:'Available Utilities',width:'100px'}
            ],
            others:[
                {id:'property_size',title:'SIZE',width:'100px'},
                {id:'property_acres',title:'ZONING',width:'100px'}
            ]
        }
        return gridHeader[type];
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
                            <div>
                                <Button label="Others"  onClick={this.propertyTypeButtonClickHandler.bind(this,'others')} className={!visiablePropertyType.others ? "bordered" : ''}/>
                            </div>
                        </div>
                        <div className="right_items">
                            {this.props.onPropertyClick ? "" : <Button href="/property/create" label="+ Add property"/> }
                        </div>
                    </div>
                    {visiablePropertyType.industrial ? this.getPropertyGrid('industrial_grid','industrial','Industrial') : ''}
                    {visiablePropertyType.office ? this.getPropertyGrid('office_grid','office','Office') : ''}
                    {visiablePropertyType.retail ? this.getPropertyGrid('retail_grid','retail','Retail') : ''}
                    {visiablePropertyType.land ? this.getPropertyGrid('land_grid','land','Land') : ''}
                    {visiablePropertyType.others ? this.getPropertyGrid('others_grid','others','Others') : ''}
                </Panel>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});
export default connect (mapStateToProps,mapDispatchToProps) (PropertyListPage);