import { Component } from "react";
import Input from "../../forms/Input";
import BrockerFormItem from "./BrockerFormItem";
import Button from "../../forms/button"; 
import BorderBox from "../../widget/borderbox";
class BrockerForm extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            s_brocker:'',
            brokers:[]
        }
    }
    onSearcChangeHandler(event){
        this.setState({
            s_brocker:event.target.value
        })
    }
    addBroker(event){
        let brokers = this.state.brokers;
        brokers.push({})
        this.setState({
            brokers:brokers
        })
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
                                brokers.map((brocker,key) => {
                                    return <BrockerFormItem key={key} brocker={brocker} />
                                } )
                            }
                        </div>
                    </div>

                </div>
                <Button onClick = {this.addBroker.bind(this)} label="+ Add brocker" />
            </BorderBox>
        );
    }
}
 
export default BrockerForm;