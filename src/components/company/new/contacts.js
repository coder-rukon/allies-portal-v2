import { Component } from "react";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: this.props.contacts ? this.props.contacts : [ this.getNewBlankObj()]
        }
    }
    componentDidMount(){
        if(this.props.onContactReady){
            this.props.onContactReady(this);
        }
    }
    getContacts(){
        return this.state.contacts;
    }
    getNewBlankObj(){
        return({
            contact_name:'',
            title:'',
            email:'',
            phone:'',
            tempId: 'contact_form_'+ Math.random().toString(16).slice(2)
        })
    }
    addNewContact(event){
        let oldCont = this.state.contacts;
        oldCont.push(this.getNewBlankObj());
        this.setState({
            contacts:oldCont
        })
    }
    onChangeHanlder(event,key,contact){
        let contactCurrent = contact;
        contactCurrent[event.target.name] = event.target.value;
        let newState = this.state.contacts.map( item => {
            if(contactCurrent.tempId == item.tempId){
                return contactCurrent;
            }
            return item;
        })

         event.target.value;
        this.setState({
            contacts:newState
        })
    }
    render() { 
        return (
            <div className="contact_list_form">
                {
                    this.state.contacts.map( (contact , key) => {
                        return(
                            <div className="row contact_list_form_item" key={key}>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="contact_name" label="Contact Name" onChange = { (event) => { this.onChangeHanlder(event,key,contact) }} value={contact.contact_name}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="title" label="Title"  value={contact.title}  onChange = { (event) => { this.onChangeHanlder(event,key,contact) }}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="email" label="Email"  value={contact.email}  onChange = { (event) => { this.onChangeHanlder(event,key,contact) }}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="phone" label="Phone"  value={contact.phone}  onChange = { (event) => { this.onChangeHanlder(event,key,contact) }}/>
                                </div>
                            </div>
                        )
                    })
                }
                
                <Button onClick={ this.addNewContact.bind(this)} label="+ Add Contact"/>
            </div>
        );
    }
}
 
export default Contacts;