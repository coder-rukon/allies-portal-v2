"use client"
import Panel from "@/components/widget/panel";
import MyProfile from "../../../components/profile/MyProfile";
import React, { Component } from 'react';
import Helper from "@/inc/Helper";

class ProfilePage extends Component {
    componentDidMount(){
        Helper.setPageData({
            title:'My Profile',
            pageTitle:'My Profile'
        })
    }
    render() {
        return (
            <div style={{width:'500px'}}>
                <Panel title="My profile">

                    <MyProfile/>
                </Panel>
            </div>
        );
    }
}

export default ProfilePage;