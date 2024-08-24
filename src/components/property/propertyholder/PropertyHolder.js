import { Component } from "react";
import Input from "../../forms/Input";
import AjaxSearchInput from "../../forms/AjaxSearchInput";
import Dropdown from "../../forms/Dropdown";
import { connect } from "react-redux";
import Loading from "@/components/widget/Loading";
import Api from "@/inc/Api";
import Button from "@/components/forms/button";
import Helper from "@/inc/Helper";
class PropertyHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            //selectedCompany:null,
            propertyHolder: this.props.data ? this.props.data : {}
        }
        this.uid = Helper.getUniqueId();
        this.searchBoxObj = null;
        
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this.uid ,this);
        }
        
    }
    getData(){
        return this.state.propertyHolder;
    }
    setData(data){
        this.setState({
            propertyHolder:data
        })
    }
    onClearSelectedHander(){
        let that = this;
        this.setState({
            //selectedCompany:null,
            loading:true,
            propertyHolder:{}
        },function(){
            that.setState({
                loading:false
            })
        })
    }
    onSearchResultItemClick(company){
        
        this.onClearSelectedHander();
        if(this.searchBoxObj){
            //this.searchBoxObj.setValue(company?.name)
        }
        this.setState({
            //selectedCompany:company,
            propertyHolder:{
                // company company_id	10055966944580
                propertyholder_company_id:company?.company_id,
                propertyholder_company_name:company?.name,
                propertyholder_contact_id:company?.company_contact?.contact_id,
                propertyholder_address_id:company?.company_address?.address_id,

                //contact
                propertyholder_contact:company?.company_contact?.contact_name,
                propertyholder_title:company?.company_contact?.contact_title,
                propertyholder_phone:company?.company_contact?.contact_phone,
                propertyholder_website:company?.website,
                propertyholder_email:company?.company_contact?.contact_email,
                // address 
                propertyholder_address_line_1:company?.company_address?.address_line_1,
                propertyholder_address_line_2:company?.company_address?.address_line_2,
                propertyholder_country:company?.company_address?.address_country,
                propertyholder_state:company?.company_address?.address_state,
                propertyholder_city:company?.company_address?.address_city,
                propertyholder_zipcode:company?.company_address?.address_zipcode
            }
        })
    }
    onPropertyHolderChangeHanlder(event){
        let propertyHolder = this.state.propertyHolder;
        this.setState({
            propertyHolder: {
                ...propertyHolder,
                [event.target.name]:event.target.value
            }
        })
    }
    onSearchChangeHanlder(event){
        let propertyHolder = this.state.propertyHolder;
        if( !Helper.getNullableValue(event.target.value)){
            this.onClearSelectedHander();
            return;
        }
        this.setState({
            propertyHolder: {
                ...propertyHolder,
                propertyholder_company_name:event.target.value
            }
        })
    }
    getCountryState(){
        let propertyHolder = this.state.propertyHolder;
        let stateList = [];
        this.props.locations.state.forEach( item => {
            if(propertyHolder.propertyholder_country){
                if(propertyHolder.propertyholder_country == item.country_id){
                    stateList.push({
                        label: item.name,
                        value: item.id
                    }) 
                }
            }else{
                stateList.push({
                    label: item.name,
                    value: item.id
                }) 
            }
            
        })
        return stateList;
    }
    deleteHandler(){
        let propertyHolder = this.state.propertyHolder;
        this.setState({
            
        })
        this.setState({
            propertyHolder: {
                ...propertyHolder,
                property_holder_deleted:true
            }
        })
    }
    getZipcodeField(){
        let disable= this.props.disable === true ? true : false;
        let propertyHolder = this.state.propertyHolder;
        if(this.props.enableDelete){
            return (
                <div className={'col-xs-12 col-sm-6'}>
                    <div className="d-flex gap-2">
                        <div style={{width:'calc(100% - 50px)'}}>
                            <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_zipcode" label="Zip Code" value={propertyHolder.propertyholder_zipcode}/>
                        </div>
                        <div style={{marginTop:'24px'}}>
                            { this.state.isDeleting ? <Loading/> : this.props.disable  ? <></> : <Button onClick={ e => this.deleteHandler() } className="only_icon" icon="delete" /> }
                        </div>
                        
                    </div>
                </div>
                
            ) 
        }
        return (
            <div className="col-xs-12 col-sm-6">
                <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_zipcode" label="Zip Code" value={propertyHolder.propertyholder_zipcode}/>
            </div>
        )
    }
    render() { 
        let propertyHolder = this.state.propertyHolder;
        let disable= this.props.disable === true ? true : false;
        let countryList = this.props.locations.country.map( item => {
            return {
                label: item.name,
                value: item.id
            }
        })
        let stateList = this.getCountryState();
        if(this.state.loading){
            return <Loading/>
        }
        if(propertyHolder.property_holder_deleted === true){
            return <></>
        }
        return (
            <div className='property_holders_list_item'  > 
                <div className="row">
                    
                    <div className="col-xs-12 col-sm-6">
                        <AjaxSearchInput  onChange={ this.onSearchChangeHanlder.bind(this)} onReady={ obj => this.searchBoxObj = obj} disable = {disable}  name="s_company" sUrl="/company/my-company-list" filterResult = { data => { return data.company.data.map( (item => { return {...item,item_label:item.name} }) ) }  } label="Company"  value={propertyHolder.propertyholder_company_name} onItemClick={this.onSearchResultItemClick.bind(this)}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_contact" label="Contact" value={propertyHolder.propertyholder_contact}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_title" label="Title" value={propertyHolder.propertyholder_title}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_phone" label="Phone" value={propertyHolder.propertyholder_phone}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_website" label="Website" value={propertyHolder.propertyholder_website}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_email" label="Email" value={propertyHolder.propertyholder_email}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_address_line_1" label="Address Line 1" value={propertyHolder.propertyholder_address_line_1}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_address_line_2" label="Address Line 2" value={propertyHolder.propertyholder_address_line_2}/>
                    </div>

                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable = {disable} options={countryList} onChange={this.onPropertyHolderChangeHanlder.bind(this)} name="propertyholder_country" label="Country" value={propertyHolder.propertyholder_country}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Dropdown  disable = {disable} options={stateList} onChange={this.onPropertyHolderChangeHanlder.bind(this)} name="propertyholder_state" label="State" value={propertyHolder.propertyholder_state}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_city" label="City" value={propertyHolder.propertyholder_city}/>
                    </div>
                    
                    {this.getZipcodeField()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    locations: state.locations, // Map your state to props
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps,mapDispatchToProps) (PropertyHolder);