import React, { Component } from 'react';
import Button from '../forms/button';
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Popup from '@/components/widget/Popup';
import PropertyListPage from '@/app/property/PropertyListPage';
import Helper from '@/inc/Helper';
import Loading from '../widget/Loading';

class LinkedProperty extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            showPopup:false,
            propertyList:[]
        }
        this.searchTimeOut = null;
    }
    componentDidMount(){
        this.loadProperty();
    }
    loadProperty(){
        let api = Api, that = this;
        that.setState({
            loading:true
        })
        let company_id = this.props.company.company_id;
        if(api.setUserToken() && company_id){
            
            api.axios().get('/company-property/get-property/'+company_id).then(res=>{
                that.setState({
                    loading:false,
                    propertyList:res.data.data
                })
            })
        }
    }
    onPropertySelect(property,row,cell){
        let api = Api, that = this;
        that.setState({
            loading:true
        })
        let data = {
            property:property.property_id,
            company: this.props.company.company_id
        }
        if(api.setUserToken()){
            api.axios().post('/company-property',data).then(res=>{
                that.setState({
                    loading:false
                })
            })
        }
        
        let propertyList = this.state.propertyList;
        propertyList.push(property);
        this.setState({
            showPopup:false,
            propertyList:propertyList
        })
    }
    showPropertyList(){
        if(!this.state.showPopup){
            return <></>
        }
        return (
            <Popup width="80%" onClose={ () => { this.setState({ showPopup:false })}}>
                <PropertyListPage onPropertyClick={this.onPropertySelect.bind(this)}/>
            </Popup>
        )
    }
    getAddress(property){
        let address = '';
        if(property.address){
            address += ( property.address.address_line_1 && Helper.getNullableValue(property.address.address_line_1) ) ? property.address.address_line_1 + ', ' : '';
            address += ( property.address.address_line_2 && Helper.getNullableValue(property.address.address_line_2) ) ? property.address.address_line_2 + ', ' : '';
            address += ( property.address.address_city && Helper.getNullableValue(property.address.address_city) ) ? property.address.address_city + ', ' : '';
            address += ( property.address.address_state && Helper.getNullableValue(property.address.address_state) ) ? property.address.address_state + ', ' : '';
            address += ( property.address.address_country && Helper.getNullableValue(property.address.address_country) ) ? property.address.address_country + ', ' : '';
            address += ( property.address.address_zipcode && Helper.getNullableValue(property.address.address_zipcode) ) ? property.address.address_zipcode : '';
        }
        return <div className='ads_p'>{address}</div>
    }
    deleteHandler(property){
        let api = Api, that = this;
        that.setState({loading:true});
        let company_id = this.props.company.company_id;
        api.setUserToken();
        api.axios().post('/company-property/delete/'+company_id+'/'+property.property_id).then(res=>{
            this.setState({
                loading:false,
            })
            that.loadProperty();
        })
        
    }
    render() {
        return (
            <div className='linked_property'>
                <div className="property_links">
                    {this.state.loading ? <Loading/> :''}
                    {this.state.propertyList.length <=0 ? <p>No Linked Properties</p> : ''}
                    {
                        this.state.propertyList.map( (propery,key) => {
                            return(
                                <div className='row p_item' key={key}>
                                    <div className='col-xs-12 col-sm-8'>
                                    {this.getAddress(propery)}
                                    </div>
                                    <div className='col-xs-12 col-sm-4'>
                                        <div className='actions_wraper' >
                                            <Button href={'/property/edit/'+propery.property_id} icon="link" label="View Property" />
                                            <Button onClick={ e => this.deleteHandler(propery) } icon="delete" />
                                        </div>
                                    </div>
                                </div>
                            ) 
                        })
                    }
                </div>
                {
                    this.showPropertyList()
                }
                {!this.state.showPopup ? <Button label="+ Link Property" onClick={ e => { this.setState({showPopup:true})}}/> : '' }
            </div>
        );
    }
}

export default LinkedProperty;