'use-client'
import React, { Component } from 'react';
import Api from '../inc/Api'
class about extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageData:''
        }
    }
    componentDidMount(){
        this.loadPage()
    }
    loadPage(){
        let api = Api, that = this;
        api.axios().get('https://alliescommercialrealty.com/wp-json/wp/v2/pages/16786').then(res => {
            console.log(res)
            that.setState({
                pageData: res.data.content.rendered
            })
        })
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html:this.state.pageData}}>
            </div>
        );
    }
}

export default about;