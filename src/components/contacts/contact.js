import { Component } from "react";
import Button from "@/components/forms/button";
import Input from "@/components/forms/Input";
import Checkbox from "@/components/forms/checkbox";
import Api from "@/inc/Api";
import Loading from "../widget/Loading";
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact:this.props.contact ? this.props.contact : {},
            integrator:this.props.integrator,
            source:this.props.source,
            isVisbleBtn: !this.props.contact.contact_id ? true : false,
            errors:{},
            isLoading:false
        }
        //this.timeOut = null;
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    onChangeHanlder(event){
        let contact = this.state.contact;
        let that = this;
        this.setState({
            isVisbleBtn:true,
            contact:{
                ...contact,
                [event.target.name]: event.target.value
            }
        },function(){
            /*
            clearTimeout(that.timeOut);
            that.timeOut = setTimeout(function(){
                that.onSaveHandler();
            },1000)
            */
        })
    }
    onCheckboxChangeHanlder(event,value){
        let contact = this.state.contact;
        this.setState({
            isVisbleBtn:true,
            contact:{
                ...contact,
                [event.target.name]: value
            }
        })
    }
    onSaveHandler(event){
        let data ={
            contact_name:this.state.contact.contact_name,
            contact_title:this.state.contact.contact_title,
            contact_phone:this.state.contact.contact_phone,
            contact_email:this.state.contact.contact_email,
            is_primary:this.state.contact.is_primary,
            source:this.state.source,
            integrator:this.state.integrator
        }
        this.setState({
            isLoading:true
        })
        let api = Api, that = this;
        if(this.state.contact.contact_id){
            data.contact_id = this.state.contact.contact_id;
            api.axios().post('/contact/update',data).then(res => {
                that.setState({
                    isVisbleBtn:false,
                    isLoading:false,
                    errors: res.data.errors,
                    contact: res.data.type ? res.data.data.contact : that.state.contact
                })
            }).catch(error => {
                that.setState({
                    isLoading:false
                })
            })
        }else{
            data.integrator = this.state.integrator;
            data.source = this.state.source;
            api.axios().post('/contact/create',data).then(res => {
                that.setState({
                    isVisbleBtn:false,
                    isLoading:false,
                    errors: res.data.errors,
                    contact: res.data.type ? res.data.data.contact : that.state.contact
                })
            }).catch(error => {
                that.setState({
                    isLoading:false
                })
            })
        }
    }
    render() {
        let contact = this.state.contact;
        let labels = {
            contact_name: 'Contact Name',
            contact_title: 'Title',
            contact_email: 'Email',
            contact_phone: 'Phone'
        }
        if(this.props.labels){
            labels = {
                ...labels,
                ...this.props.labels
            }
        }
        return ( 
            <div className="row contact_list_form_item" >
                <div className="col-xs-12 col-sm-6">
                    <Input disable={this.props.disable} errors={this.state.errors} name="contact_name" label={labels.contact_name} onChange = { this.onChangeHanlder.bind(this) } value={contact.contact_name}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input  disable={this.props.disable} name="contact_title" label={labels.contact_title}  value={contact.contact_title}  onChange = { this.onChangeHanlder.bind(this) }/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input  disable={this.props.disable} name="contact_email"  errors={this.state.errors}  label={labels.contact_email} value={contact.contact_email}  onChange = { this.onChangeHanlder.bind(this) }/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input  disable={this.props.disable} name="contact_phone" label={labels.contact_phone} value={contact.contact_phone}  onChange = { this.onChangeHanlder.bind(this) }/>
                </div>
                {
                    this.props.hidePrimary ? '' : <div className="col-xs-12 col-sm-6"><Checkbox  disable={this.props.disable} name="is_primary" checked={ contact.is_primary } title="Primary Contact"    onChange = { this.onCheckboxChangeHanlder.bind(this) }/></div>
                }
                
                <div className="col-xs-12 col-sm-12">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        {this.state.isLoading? <div><Loading/></div> : ''}
                        {this.state.isVisbleBtn && !this.state.isLoading && this.props.disable !== true ? <div><Button onClick={this.onSaveHandler.bind(this)} label="Save"/></div> : '' }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Contact;