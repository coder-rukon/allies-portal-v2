import { Component } from "react";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/button";
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
    setData(data){
        let contacts = data.map( ctItem => {
            return{
                ...this.getNewBlankObj(),
                ...ctItem
            }
        })
        console.log("Contact set",contacts)
        this.setState({
            contacts:contacts
        })
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
    deleteHandler(contact){
        let contacts = this.state.contacts;
        let newContact = [];
        contacts.forEach(oldContact => {
            if(oldContact.tempId != contact.tempId){
                newContact.push(oldContact)
            }
        });
        this.setState({
            contacts:newContact
        })
    }
    getPhoneField(contact,canDelete,inputArg){
        if(canDelete){
            return(
                <div className={'col-xs-12 col-sm-6'}>
                    <div className="d-flex gap-2">
                        <div style={{width:'calc(100% - 50px)'}}>
                            <Input {...inputArg}/>
                        </div>
                        <div style={{marginTop:'24px'}}>
                            <Button onClick={ e => this.deleteHandler(contact) } className="only_icon" icon="delete" />
                        </div>
                        
                    </div>
                </div>
            )
        }
        return(
            <div className={'col-xs-12 col-sm-6'}>
                <Input  {...inputArg}/>
            </div>
        )
    }
    render() { 
        let errors = this.props.errors ?  this.props.errors : []
        return (
            <div className="contact_list_form">
                {
                    this.state.contacts.map( (contact , key) => {
                        return(
                            <div className="contact_list_form_item" key={key}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="contact_name" errors={errors} errorName={'contacts.'+key+'.contact_name'}  label="Contact Name" onChange = { (event) => { this.onChangeHanlder(event,key,contact) }} value={contact.contact_name}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="title" label="Title" errors={errors} errorName={'contacts.'+key+'.title'} value={contact.title}  onChange = { (event) => { this.onChangeHanlder(event,key,contact) }}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Input name="email" label="Email" errors={errors} errorName={'contacts.'+key+'.email'} value={contact.email}  onChange = { (event) => { this.onChangeHanlder(event,key,contact) }}/>
                                    </div>
                                    {
                                        this.getPhoneField(contact,key >= 1,{
                                            name:"phone", 
                                            label:"Phone", 
                                            errors:errors ,
                                            errorName:'contacts.'+key+'.phone',
                                            value:contact.phone,
                                            onChange : (event) => { this.onChangeHanlder(event,key,contact) }
                                        })
                                    }
                                </div>
                                
                            </div>
                        )
                    })
                }
                
                <Button onClick={ this.addNewContact.bind(this)} label="+ Additional Contact"/>
            </div>
        );
    }
}
 
export default Contacts;