import { Component } from "react";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/button";
import Contact from "./contact";
import Api from "@/inc/Api";
import $ from 'jquery';
import '../../../public/js/jquery-ui.min.js';
import Helper from "@/inc/Helper";
import Loading from "../widget/Loading";
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            integrator:this.props.integrator,
            source:this.props.source,
            contacts:[]
        }
        this.contactComponents = [];
    }
    componentDidMount(){
        this.loadContacts();
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    componentDidUpdate(){
        this.intShortable();
    }
    intShortable(){
        /*
        $(".shortable_items").sortable({
            handle: ".dragdrop_hanlder"
        });
        */
    }
    onContactReady(contactCmp){
        //this.contactComponents.push(contactCmp)
    }
    getContacts(){
        let contacts = this.state.contacts.map(contact => {
            return {
                ...contact,
                contact_name : Helper.getNullableValue(contact.contact_name),
                contact_title : Helper.getNullableValue(contact.contact_title),
                contact_email : Helper.getNullableValue(contact.contact_email),
                contact_phone : Helper.getNullableValue(contact.contact_phone),
                contact_website : Helper.getNullableValue(contact.contact_website)
            }
        })
        return contacts;
    }
    onContactChange(updatedContact){
        let contacts = this.state.contacts;
        let newContactsList = [];
        contacts.forEach(item => {
            if(updatedContact.contact_id && updatedContact.contact_id  == item.contact_id){
                newContactsList.push(updatedContact)
            }
            else if(updatedContact.new_contact_random_id && updatedContact.new_contact_random_id  == item.new_contact_random_id ){
                newContactsList.push(updatedContact)
            }
            else{
                newContactsList.push(item)
            }
        })
        this.setState({
            contacts:newContactsList
        })
    }    
    onContactDelete(updatedContact){
        let contacts = this.state.contacts;
        let newContactsList = [];
        contacts.forEach(item => {
            if(updatedContact.contact_id && updatedContact.contact_id  == item.contact_id){
                //newContactsList.push(updatedContact)
            }
            else if(updatedContact.new_contact_random_id && updatedContact.new_contact_random_id  == item.new_contact_random_id ){
                //newContactsList.push(updatedContact)
            }
            else{
                newContactsList.push(item)
            }
        })
        this.setState({
            isLoading:true
        },function(){
            this.setState({
                isLoading:false,
                contacts:newContactsList
            })
        })
        
    }
    loadContacts(){
        let that = this, api = Api;
        if(api.setUserToken()){
            this.setState({
                isLoading:true
            })
            let data = {
                integrator:this.state.integrator,
                source:this.state.source
            }
            api.axios().get('/contacts/all?source='+data.source+'&integrator='+data.integrator).then(response => {
                that.setState({
                    contacts:response.data.data.contacts,
                    isLoading:false
                })
            }).catch(error => {

            })
        }

    }
    getNewBlankObj(){
        return({
            new_contact_random_id:Helper.getUniqueId(),
            contact_name:'',
            contact_title:'',
            contact_phone:'',
            contact_email:'',
            contact_website:'',
            is_primary:'no'
        })
    }
    addNewContact(event){
        let oldCont = this.state.contacts;
        oldCont.push(this.getNewBlankObj());
        this.setState({
            contacts:oldCont
        })
    }
    render() { 
        if(this.state.isLoading){
            return <Loading/>
        }
        return (
            <div className="contact_list_form contact_component">
                <div className="shortable_items">
                {
                    this.state.contacts.map( (contact , key) => {
                        return(
                           <Contact onChange = {this.onContactChange.bind(this)} onDelete={this.onContactDelete.bind(this)} canDelete={key >= 1 } onReady = { this.onContactReady.bind(this)} key={key} disable={this.props.disable} hidePrimary = { this.props.hidePrimary === true ? true : false } contact={contact} integrator={ this.state.integrator} source={this.state.source} labels= {this.props.labels ? this.props.labels : null}/>
                        )
                    })
                }
                </div>
                
                {this.props.disable == true ? "" : <Button className="add_new" onClick={ this.addNewContact.bind(this)} label={this.props.btnLabel ? this.props.btnLabel : '+ Additional Contact'}/> }
                
            </div>
        );
    }
}
 
export default Contacts;