"use client"
import React, { Component } from 'react';
import FileUploader from '@/components/widget/FileUploader';
import BorderBox from '@/components/widget/borderbox';
class UploadClientEngagementLetter extends Component {
    render() {
        return (
            <div className='upload_client_agl_section'>
                <div className='title_subtitle'>
                    <h2>Client Engagement Letter</h2>
                    <p>Please upload a copy of the client engagement letter to continue.</p>
                </div>
                <BorderBox>
                    <FileUploader/>
                </BorderBox>
                
            </div>
        );
    }
}

export default UploadClientEngagementLetter;