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
            visiablePropertyType:{
                office:true,
                industrial:true,   
                retail:false,   
                land:false,   
            }
        }
    }
    componentDidMount(){
        if(!this.props.exportable){
            this.props.setOptions({title:'Properties'})
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
        
        return(
            <PropertyGrid onPropertyClick={ this.props?.onPropertyClick } gridId={gridId} propertyType={pType} title={title}/>
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
                            {this.props.onPropertyClick ? "" : <Button href="/property/create" label="+ Add property"/> }
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
const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});
export default connect (mapStateToProps,mapDispatchToProps) (PropertyListPage);