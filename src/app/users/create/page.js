'use client'
import Panel from '@/components/widget/panel';
import React, { Component } from 'react';
import CreateUser from '@/components/users/create/CreateUser';
import Helper from '@/inc/Helper';
class CreateUserPage extends Component {
    componentDidMount(){
        Helper.setPageData({
            title:"Create user",
            pageTitle:"Create user",
        })
    }
    render() {
        return (
            <div className='create_user_page'>
                <div style={{width:'700px',maxWidth:'100%'}}>
                    <Panel>
                        <CreateUser/>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default CreateUserPage;