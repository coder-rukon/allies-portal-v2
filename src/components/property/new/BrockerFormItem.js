import { Component } from "react";
import Input from "../../forms/Input";
class BrockerFormItem extends Component {
    constructor(props) {
        super(props);
    }
    onSearcChangeHandler(event){
        
    }
    onChangeHanlder(event){

    }
    render() { 
        let brocker = {}
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onSearcChangeHandler.bind(this)}  name="company" label="Company" value={brocker.company}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="contact" label="Contact" value={brocker.contact}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="phone" label="Phone" value={brocker.phone}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="email" label="Email" value={brocker.email}/>
                </div>
            </div>
        );
    }
}
 
export default BrockerFormItem;