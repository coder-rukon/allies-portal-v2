"use client"
import React, { Component } from 'react';
import Popup from './Popup';
import Button from '../forms/button';
import Loading from './Loading';
class ConfirmPopup extends Component {
    onCancelHanlder(){
        if(this.props.isLoading){
            return;
        }
        if(this.props.onClose){
            this.props.onClose()
        }
    }
    onYesHanlder(){
        if(this.props.isLoading){
            return;
        }
        if(this.props.onYes){
            this.props.onYes()
        }
    }
    render() {
        return (
            <Popup isCenter={true} width={"500px"}  {...this.props} onClose = {this.onCancelHanlder.bind(this)}>
                <div className='confirm_box_popup'>
                    <h2>{this.props.confirm_title}</h2>
                    
                    <div className='d-flex mt-5 justify-content-between gap-2'>
                        {this.props.isLoading ? '' : <Button  className="bordered" label="Yes" onClick = {this.onYesHanlder.bind(this)} /> }
                        {this.props.isLoading ? <div style={{width:'100%',textAlign:'center'}}><Loading/></div>  : ''}
                        {this.props.isLoading ? '' : <Button className="bordered" label="No" onClick = {this.onCancelHanlder.bind(this)} /> }
                        
                    </div>
                </div>
            </Popup>
        );
    }
}

export default ConfirmPopup;