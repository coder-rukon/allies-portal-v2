import { Component } from "react";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts:[ this.getNewBlankObj()]
        }
    }
    getNewBlankObj(){
        return({
            contact_name:'',
            title:'',
            email:'',
            phone:''
        })
    }
    addNewContact(event){
        let oldCont = this.state.contacts;
        oldCont.push(this.getNewBlankObj());
        this.setState({
            contacts:oldCont
        })
    }
    onChangeHanlder(event,key){
        let item = this.state.contacts[key];
        item[event.target.name] = event.target.value;
        let allItems = this.state.contacts;
        let newItems = []
        allItems.forEach( (element,itemKey) => {
            if(itemKey == key){
                newItems.push(item)
            }else{
                newItems.push(element)
            }
        });
        this.setState({
            contacts:newItems
        })
    }
    render() { 
        return (
            <div>
                {
                    this.state.contacts.map( (contact , key) => {
                        return(
                            <div className="row" key={key}>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="contact_name" label="Contact Name" onChange = { (event) => { this.onChangeHanlder(event,key) }} value={contact.contact_name}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="title" label="Title"  value={contact.title}  onChange = { (event) => { this.onChangeHanlder(event,key) }}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="email" label="Email"  value={contact.email}  onChange = { (event) => { this.onChangeHanlder(event,key) }}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Input name="phone" label="Phone"  value={contact.phone}  onChange = { (event) => { this.onChangeHanlder(event,key) }}/>
                                </div>
                            </div>
                        )
                    })
                }
                
                <Button onClick={ this.addNewContact.bind(this)} label="+ Add Contact Test"/>
            </div>
        );
    }
}
 
export default Contacts;