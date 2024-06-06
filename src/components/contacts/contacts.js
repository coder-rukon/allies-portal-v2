import { Component } from "react";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/button";
import Contact from "./contact";
import Api from "@/inc/Api";
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
    onContactReady(contactCmp){
        //this.contactComponents.push(contactCmp)
    }
    getContacts(){
        return this.state.contacts;
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
            api.axios().get('/contact/all?source='+data.source+'&integrator='+data.integrator).then(response => {
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
            contact_name:'',
            contact_title:'',
            contact_phone:'',
            contact_email:'',
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
        return (
            <div className="contact_list_form contact_component">
                {
                    this.state.contacts.map( (contact , key) => {
                        return(
                           <Contact onReady = { this.onContactReady.bind(this)} key={key} disable={this.props.disable} hidePrimary = { this.props.hidePrimary === true ? true : false } contact={contact} integrator={ this.state.integrator} source={this.state.source} labels= {this.props.labels ? this.props.labels : null}/>
                        )
                    })
                }
                {this.props.disable == true ? "" : <Button className="add_new" onClick={ this.addNewContact.bind(this)} label={this.props.btnLabel ? this.props.btnLabel : '+ Additional Contact'}/> }
                
            </div>
        );
    }
}
 
export default Contacts;