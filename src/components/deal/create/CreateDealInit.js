"use client"
import BorderBox from '@/components/widget/borderbox';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';

class CreateDealInit extends Component {
    constructor(props){
        super(props);
        this.state = {
            active:null
        }
    }
    componentDidMount(){
        if(this.props.active){
            this.setState({
                active:this.props.active
            })
        }
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    onItemClick(dealType){
        this.setState({active:dealType.id})
        if( this.props.onTypeSelect){
            this.props.onTypeSelect(dealType);
        }
    }
    render() {
        let dealTypes = Settings.getDealType();
        return (
            <div className='deal_types_box'>
                <BorderBox title="Deal Type">
                    <ul className='deal_type_list'>
                        {
                            dealTypes.map( (dealType,key) => {
                                return(
                                    <li key={key} className={ this.state.active == dealType.id ? 'active' : ''} onClick={ e => this.onItemClick(dealType) }>
                                        {dealType.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </BorderBox>
            </div>
        );
    }
}

export default CreateDealInit;