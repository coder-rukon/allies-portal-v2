import React, { Component } from 'react';
import Button from '../forms/button';
import BorderBox from "@/components/widget/borderbox";
import Input from '../forms/Input';
class ShareAccessSidebar extends Component {
    render() {
        return (
            <div className='share_access_sidebar'>
                <div className='top_section'>
                    <BorderBox title="Add Users">
                        <Input icon="search" placeholder="Search User"/>
                    </BorderBox>
                    <BorderBox title="Manage Access">

                    </BorderBox>
                </div>
                
                <div className='sac_sidebar_footer d-flex justify-content-end'>
                    <Button className="no_bg" label="Cancel"/>
                    <Button label="Save"/>
                </div>
            </div>
        );
    }
}

export default ShareAccessSidebar;