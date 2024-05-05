import { Component } from "react";
import Input from "../../forms/Input";
import AjaxSearchInput from "../../forms/AjaxSearchInput";
import BorderBox from "../../widget/borderbox";
import Dropdown from "../../forms/Dropdown";
import { connect } from "react-redux";
import ActionsTypes from "@/inc/ActionTypes";
import Loading from "@/components/widget/Loading";
import Api from "@/inc/Api";
class PropertyHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            selectedCompany:null,
            propertyHolder:{}
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this);
        }
        if(this.props.propertyholder_id){
            this.loadPropertyHolder(this.props.propertyholder_id)
        }
    }
    loadPropertyHolder(propertyholder_id){
        let that = this, api = Api;
        that.setState({
            loading:true
        })
        api.axios().get('/propertyholder/details/'+propertyholder_id).then(res=> {
            that.setState({
                loading:false,
                propertyHolder:res.data.data
            })
        })
    }
    getData(){
        return this.state.propertyHolder;
    }
    onPropertyHolderItemClick(company){
        this.setState({
            selectedCompany:company.propertyholder_company,
            propertyHolder:company
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
    onClearSelectedHander(event){
        let that = this;
        this.setState({
            selectedCompany:null,
            loading:true,
            propertyHolder:{}
        },function(){
            that.setState({
                loading:false
            })
        })
    }
    getSelectedItemControler(){
        if(!this.state.selectedCompany){
            return<></>
        }
        return (
            <div className="col-xs-12 col-sm-12">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{this.state.selectedCompany}</strong>
                    <button type="button" className="btn-close" onClick={ e =>{ this.onClearSelectedHander(e)} }></button>
                </div>
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
        return (
                <BorderBox title={this.props.title}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <AjaxSearchInput  disable = {disable}  name="s_company" sUrl="/propertyholder/search" filterResult = { data => { return data.propertyholders.map( (item => { return {...item,item_label:item.propertyholder_company} }) ) }  } onItemClick={this.onPropertyHolderItemClick.bind(this)} placeholder="Search existing company"/>
                        </div>
                        {
                            this.getSelectedItemControler()
                        }
                       
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_company" label="Company" value={propertyHolder.propertyholder_company}/>
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
                      
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_zipcode" label="Zip Code" value={propertyHolder.propertyholder_zipcode}/>
                        </div>
                    </div>
                </BorderBox>
        );
    }
}
const mapStateToProps = (state) => ({
    locations: state.locations, // Map your state to props
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps,mapDispatchToProps) (PropertyHolder);