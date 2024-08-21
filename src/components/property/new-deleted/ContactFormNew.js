import { Component } from "react";
import Input from "../../forms/Input";
import Button from "../../forms/button"; 
import BorderBox from "../../widget/borderbox";
import NewContactFormItem from "./NewContactFormItem";
class ContactFormNew extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            s_brocker:'',
            brokers:[]
        }
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    onSearcChangeHandler(event){
        this.setState({
            s_brocker:event.target.value
        })
    }
    onChangeHander(key,broker){
        let brokers = this.state.brokers;
        brokers[key] = broker;
        this.setState({
            brokers:brokers
        })
    }
    addBroker(event){
        let brokers = this.state.brokers;
        brokers.push({
            company:"",
            contact:"",
            phone:"",
            email:""
        })
        this.setState({
            brokers:brokers
        })
    }
    getBrokers(){
        return this.state.brokers;
    }
    render() { 
        let search_brocker = '';
        let brokers = this.state.brokers;
        return (
            <BorderBox title="Broker Contact">
                <div className="row">
                    
                    <div className="col-xs-12 col-sm-12">
                        <Input onChange={this.onSearcChangeHandler.bind(this)}  name="search_brocker" placeholder="Search existing brocker" value={this.state.s_brocker}/>
                    </div>
                    <div className="col-xs-12 col-sm-12">
                        <div className="brockers">
                            {
                                brokers.map((broker,key) => {
                                    return <NewContactFormItem key={key} brokerKey={key} broker={broker} onChange={ this.onChangeHander.bind(this)} />
                                } )
                            }
                        </div>
                    </div>

                </div>
                <Button onClick = {this.addBroker.bind(this)} label="+ Add Broker" />
            </BorderBox>
        );
    }
}
 
export default ContactFormNew;