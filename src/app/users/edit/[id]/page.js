'use client'
import Helper from '@/inc/Helper';
import React, { Component } from 'react';
import EditUser from '@/components/users/edit/EditUser';
import Panel from '@/components/widget/panel';
class page extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        Helper.setPageData({
            title:"Edit user",
            pageTitle:"Edit user",
        })
    }
    render() {
        let user_id = this.props.params.id;
        return (
            <div style={{width:'700px',maxWidth:'100%'}}>
                <Panel >
                    <EditUser user_id={user_id} />
                </Panel>
            </div>
            
        );
    }
}

export default page;