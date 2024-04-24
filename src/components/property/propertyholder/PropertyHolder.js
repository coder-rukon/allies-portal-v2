import { Component } from "react";
import Input from "../../forms/Input";
import AjaxSearchInput from "../../forms/AjaxSearchInput";
import BorderBox from "../../widget/borderbox";
import Dropdown from "../../forms/Dropdown";
import { connect } from "react-redux";
class PropertyHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyHolder:{}
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    getData(){
        return this.state.propertyHolder;
    }
    onPropertyHolderItemClick(company){
        this.setState({
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
    render() { 
        let propertyHolder = this.state.propertyHolder;
        let disable= this.props.disable === true ? true : false;
        console.log("Root location",this.props.locations)
        return (
                <BorderBox title={this.props.title}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <AjaxSearchInput  disable = {disable}  name="s_company" sUrl="/propertyholder/search" filterResult = { data => { return data.propertyholders.map( (item => { return {...item,item_label:item.propertyholder_company} }) ) }  } onItemClick={this.onPropertyHolderItemClick.bind(this)} placeholder="Search existing company"/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_company" label="Company" value={propertyHolder.propertyholder_company}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_contact" label="Contact" value={propertyHolder.propertyholder_contact}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_title" label="Title" value={propertyHolder.propertyholder_title}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_phone" label="Phone" value={propertyHolder.propertyholder_phone}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_website" label="Website" value={propertyHolder.propertyholder_website}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_email" label="Email" value={propertyHolder.propertyholder_email}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_address_line_1" label="Address Line 1" value={propertyHolder.propertyholder_address_line_1}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_address_line_2" label="Address Line 2" value={propertyHolder.propertyholder_address_line_2}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_city" label="City" value={propertyHolder.propertyholder_city}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_state" label="State" value={propertyHolder.propertyholder_state}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_country" label="Country" value={propertyHolder.propertyholder_country}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Input disable={disable || propertyHolder.propertyholder_id} className="disable_with_border_" onChange={this.onPropertyHolderChangeHanlder.bind(this)}  name="propertyholder_zipcode" label="Zip Code" value={propertyHolder.propertyholder_zipcode}/>
                        </div>
                    </div>
                </BorderBox>
        );
    }
}
const mapStateToProps = (state) => ({
    locations: state.locations, // Map your state to props
});
let mapDispatchToProps = {

}
export default connect(mapStateToProps,mapDispatchToProps) (PropertyHolder);