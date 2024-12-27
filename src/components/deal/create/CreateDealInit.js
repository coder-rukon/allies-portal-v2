"use client"
import BorderBox from '@/components/widget/borderbox';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';

class CreateDealInit extends Component {
    constructor(props){
        super(props);
        this.state = {
            active:[]
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
        let activeMenu = this.state.active;
        if(activeMenu.includes(dealType.id)){
            activeMenu = activeMenu.filter(menuId => menuId != dealType.id);
        }else{
            activeMenu.push(dealType.id)
        }
        if(dealType.id == '5' || dealType.id == '6'){
            activeMenu = activeMenu.filter(menuId => menuId != 7);
            activeMenu = activeMenu.filter(menuId => menuId != 8);
        }else{
            activeMenu = activeMenu.filter(menuId => menuId != 5);
            activeMenu = activeMenu.filter(menuId => menuId != 6);
            
        }
        
        this.setState({active:activeMenu})
        if( this.props.onTypeSelect){
            this.props.onTypeSelect(activeMenu);
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
                                    <li key={key} className={ this.state.active.includes(dealType.id) ? 'active' : ''} onClick={ e => this.onItemClick(dealType) }>
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