import React, { Component } from 'react';

class Popup extends Component {
    constructor(props){
        super(props);
    }
    onClose(){
        if(this.props.onClose){
            this.props.onClose()
        }
    }
    render() {
        let containerStyle = {}
        if(this.props.width){
            containerStyle.width = this.props.width;
        }
        let popupClass = 'rs_popup_section';
        if(this.props.isCenter === true){
            popupClass += ' center_popup';
        }
        if(this.props.isInner){
            popupClass += '  inner_popup';
        }
        return (
            <div className={popupClass}>
                <div className='popup_container' style={containerStyle}>
                    <div className='popup_close' onClick={this.onClose.bind(this)}><span className="material-symbols-outlined">close</span></div>
                    <div className='popup_contents'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;