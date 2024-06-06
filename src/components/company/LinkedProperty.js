import React, { Component } from 'react';
import Button from '../forms/button';
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Popup from '@/components/widget/Popup';
import PropertyListPage from '@/app/property/PropertyListPage';
import Helper from '@/inc/Helper';
import Loading from '../widget/Loading';
import Link from 'next/link';

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
                that.loadProperty();
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
        return <div className='ads_p'><Link href={'/property/edit/'+ property.property_id}>{address}</Link></div>
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
    getPropertyLinkType(property){
        let company = this.props.company;
        let label = '';
        if(company){
            if(company.company_id == property.property_owner){
                label = <div className='badge bg-primary'>Owner</div>
            }
            if(company.company_id == property.property_tenant){
                label = <div className='badge bg-secondary'>Tenant</div>
            }
        }
        return label;
    }
    getLinkBtn(){
        let disable = this.props.disable  === true ? true : false;
        if(this.state.showPopup || disable == true){
            return;
        }
        return <Button label="+ Link Property" onClick={ e => { this.setState({showPopup:true})}}/> 
    }
    render() {
        let disable = this.props.disable  === true ? true : false;
        return (
            <div className='linked_property'>
                <div className="property_links">
                    {this.state.loading ? <Loading/> :''}
                    {this.state.propertyList.length <=0 ? <p>No Linked Properties</p> :  ""}
                    {
                        this.state.propertyList.map( (propery,key) => {
                            return(
                                <div className='row p_item' key={key}>
                                    <div className='col-xs-12 col-sm-6'>
                                        {this.getAddress(propery)}
                                    </div>
                                    <div className='col-xs-12 col-sm-2'>
                                        {this.getPropertyLinkType(propery)}
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
                {
                    this.showPropertyList()
                }
                {this.getLinkBtn()}
            </div>
        );
    }
}

export default LinkedProperty;