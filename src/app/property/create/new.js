"use client"
import { Component } from "react";
import CreatePropertyForm from "../../../components/property/createProperty";
import Panel from "@/components/widget/panel";

class NewProperty extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <Panel>
                <CreatePropertyForm/>
            </Panel>
            
        );
    }
}
 
export default constructor;