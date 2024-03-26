import { Component } from "react";
import Input from "../../forms/Input";
class BrokerFormItem extends Component {
    constructor(props) {
        super(props);
    }
    onChangeHanlder(event){
        let broker = {
            ...this.props.broker,
            [event.target.name]:event.target.value
        }
        this.props.onChange(this.props.brokerKey,broker)
    }

    render() { 
        let broker = this.props.broker;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="company" label="Company" value={broker.company}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="contact" label="Contact" value={broker.contact}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="phone" label="Phone" value={broker.phone}/>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <Input onChange={this.onChangeHanlder.bind(this)}  name="email" label="Email" value={broker.email}/>
                </div>
            </div>
        );
    }
}
 
export default BrokerFormItem;