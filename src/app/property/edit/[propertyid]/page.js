"use client"
import { Component } from "react";
import Panel from "@/components/widget/panel";
import Api from "@/inc/Api";
import Loading from "@/components/widget/Loading";
import EditProperty from "@/components/property/edit/EditProperty";
import Helper from "@/inc/Helper";
class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: null,
            loading:false
        }
    }
    componentDidMount(){
        let propertyId = this.props.params.propertyid;
        if(propertyId){
            this.loadProperty(propertyId)
        }
        Helper.setPageData({
            title:'Edit Property',
            pageTitle: "Edit Property"
        })
    }
    loadProperty(propertyId){
        let api = Api, that = this;
        that.setState({
            loading:true
        })
        api.setUserToken();
        api.axios().get('/property/details/'+propertyId).then(res=> {
            that.setState({
                loading:false,
                property:res.data.data
            })
        }).then(error => {
            that.setState({
                loading:false
            })
        })
    }
    render() { 
        if(this.state.loading){
            return <Loading/>
        }
        if(!this.state.property){
            return <div className="alert alert-danger">No property found</div>
        }
        return (
            <Panel>
                { this.state.property ? <EditProperty property={this.state.property}/> : ''}
                
            </Panel>
            
        );
    }
}
 
export default Page;