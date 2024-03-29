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
    }
    componentDidMount(){
        this.loadContacts();
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
                           <Contact key={key} disable={this.props.disable} contact={contact} integrator={ this.state.integrator} source={this.state.source}/>
                        )
                    })
                }
                {this.props.disable == true ? "" : <Button className="add_new" onClick={ this.addNewContact.bind(this)} label="+ Add Contact"/> }
                
            </div>
        );
    }
}
 
export default Contacts;