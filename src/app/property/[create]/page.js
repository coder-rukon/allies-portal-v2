"use client"
import { Component } from "react";
import CreatePropertyForm from "../../../components/property/createProperty";
import Panel from "@/components/widget/panel";
import Helper from "@/inc/Helper";
class Page extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        Helper.setPageData({
            title:'Create property',
            pageTitle: "Create Property"
        })
    }
    render() { 
        return (
            <Panel>
                <CreatePropertyForm/>
            </Panel>
            
        );
    }
}
 
export default Page;