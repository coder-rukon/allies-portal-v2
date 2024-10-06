"use client"
import React, { Component } from 'react';
import FileUploader from '../widget/FileUploader';
import Input from '../forms/Input';
import Dropdown from '../forms/Dropdown';
import Helper from '@/inc/Helper';
import Settings from '@/inc/Settings';
import Button from '../forms/button';

class PopupImporter extends Component {
    render() {
        let ProspectSource= Helper.prospectSource()
        let prospectType= Helper.prospectType()
        return (
            <div className='prospects_import_popup_inner'>
                <h4 className='popup_title'>Import Prospects</h4>
                <FileUploader id="prospects_upload" border={true}/>
                <div className='row'>
                    <div className='col-xs-12 col-sm-6'>
                        <Dropdown options={ProspectSource} label="Prospect Source *" name="prospect_source" />
                    </div>
                    <div className='col-xs-12 col-sm-6'>
                        <Dropdown options={prospectType} label="Prospect Type *" name="prospect_type" />
                    </div>
                </div>
                <div className='popup_footer text-end'>
                    <Button label="Cancel" className="mr-2" />
                    <Button label="Import" disable={true} />
                </div>
            </div>
        );
    }
}

export default PopupImporter;