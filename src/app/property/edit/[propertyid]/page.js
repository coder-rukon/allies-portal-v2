"use client"
import { Component } from "react";
import Panel from "@/components/widget/panel";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: null
        }
    }
    componentDidMount(){
        let propertyId = this.props.params.propertyid;
        this.loadProperty(propertyId)
    }
    loadProperty(propertyId){

    }
    render() { 
        return (
            <Panel>
                Prperty edit form
            </Panel>
            
        );
    }
}
 
export default Page;