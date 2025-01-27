import React, { Component } from 'react';
import ShareAccessSidebar from './ShareAccessSidebar';
class ShareAccessBtn extends Component {
    render() {
        return (
            <div className='share_access_wrapper'>
                <ShareAccessSidebar/>
                <div className='share_access_btn'>
                    <span class="material-symbols-outlined">share</span>
                    <span className='txt'>Share/Manage Access</span>
                </div>
            </div>
        );
    }
}

export default ShareAccessBtn;