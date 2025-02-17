import React, { Component } from 'react';
import Popup from '@/components/widget/Popup';
import PropertyListPage from '@/app/property/PropertyListPage';
import Button from "@/components/forms/button";
import Link from 'next/link';
import Helper from '@/inc/Helper';
class NewCompanyLinkProperty extends Component {
    constructor(props){
        super(props);
        this.state = {
            property_link_type:null,
            propertyList: this.props.propertyList ? this.props.proeprtyList : [],
            showPopup:false,
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    getData(){
        return this.state.propertyList;
    }
    onPropertySelect(proeprty){
        let allProperty = this.state.propertyList;
        if(!allProperty.some( item => { return item.property_id == proeprty.property_id})){
            allProperty.push({
                ...proeprty,
                rs_property_link_type: this.state.property_link_type
            });
        }
        this.setState({
            showPopup:false,
            property_link_type:null,
            propertyList:allProperty
        })
    }
    deleteHandler(property){
        let filteredProperty = this.state.propertyList.filter( item => { return property.property_id != item.property_id })
        this.setState({
            propertyList:filteredProperty
        })
    }
    selectPropertyLinkType(type){
        this.setState({
            property_link_type: type
        })
    }
    showPopup(){
        if(!this.state.showPopup){
            return;
        }
        if(!this.state.property_link_type){
            return(
                <Popup width="400px" onClose={ () => { this.setState({ showPopup:false,property_link_type:null })}}>
                    <div className='class_property_link_types'>
                        <h3>Select Property link type</h3>
                        <div>
                            <Button label="Property Tenant" onClick={ e => { this.selectPropertyLinkType('tenant')}}/>
                            <Button label="Property Owner" onClick={ e => { this.selectPropertyLinkType('owner')}}/>
                        </div>
                    </div>
                </Popup>
            )
        }
        
        return(
            <Popup width="80%" onClose={ () => { this.setState({ showPopup:false,property_link_type:null })}}>
                <PropertyListPage onPropertyClick={this.onPropertySelect.bind(this)} exportable={true}/>
            </Popup>
        )
    }
    getAddress(property){
        let address = '';
        if(property.address){
            address += ( property.address.address_line_1 && Helper .getNullableValue(property.address.address_line_1) ) ? property.address.address_line_1 + ', ' : '';
            address += ( property.address.address_line_2 && Helper.getNullableValue(property.address.address_line_2) ) ? property.address.address_line_2 + ', ' : '';
            address += ( property.address.address_city && Helper.getNullableValue(property.address.address_city) ) ? property.address.address_city + ', ' : '';
            address += ( property.address.address_state && Helper.getNullableValue(property.address.address_state) ) ? property.address.address_state + ', ' : '';
            address += ( property.address.address_country && Helper.getNullableValue(property.address.address_country) ) ? property.address.address_country + ', ' : '';
            address += ( property.address.address_zipcode && Helper.getNullableValue(property.address.address_zipcode) ) ? property.address.address_zipcode : '';
        }
        if(address == ''){
            address = property.property_id;
        }
        return <div className='ads_p'><Link href={'/property/edit/'+ property.property_id}>{address}</Link></div>
    }
    render() {
        let disable = false;
        return (
            <div className='linked_property'>
                {
                    this.state.propertyList.length <= 0 ? <div className="property_links"><p>No Linked Properties</p></div> : ''
                }
                <div className='property_links'>
                    {
                        this.state.propertyList.map( (propery,key) => {
                            return(
                                <div className='row p_item' key={key}>
                                    <div className='col-xs-12 col-sm-8'>
                                        {this.getAddress(propery)}
                                    </div>
                                    <div className='col-xs-12 col-sm-4'>
                                        <div className='actions_wraper' >
                                            {disable ? '' : <div><Button onClick={ e => this.deleteHandler(propery) } className="only_icon" icon="delete" /></div>}
                                        </div>
                                    </div>
                                </div>
                            ) 
                        })
                    }
                </div>
                <Button label="+ Link Property" onClick= { e => {this.setState({showPopup:true})} }/>
                {this.showPopup()}

            </div>
        );
    }
}

export default NewCompanyLinkProperty;