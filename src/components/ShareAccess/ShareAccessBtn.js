import React, { Component } from 'react';
import ShareAccessSidebar from './ShareAccessSidebar';
import Helper from '@/inc/Helper';
class ShareAccessBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowSidebar:false,
        }
        this.sidebarObj = null;
    }
    componentDidMount(){
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    toggleSidebar(){
        if(this.sidebarObj){
            this.sidebarObj.showSidebar();
        }
    }
    getData(){
        
        let data = [];
        if(this.sidebarObj){
            this.sidebarObj.getData().forEach(item => {
                data.push({
                    id:item.user.id,
                    role_id: Helper.getNullableValue(item.role_id)
                });
            });
        }
        return data;
    }
    render() {
        return (
            <div className='share_access_wrapper'>
                <ShareAccessSidebar onReady={ sideObj => { this.sidebarObj = sideObj }}/>
                <div className='share_access_btn' onClick={this.toggleSidebar.bind(this)}>
                    <span className="material-symbols-outlined">share</span>
                    <span className='txt'>Share/Manage Access</span>
                </div>
            </div>
        );
    }
}

export default ShareAccessBtn;