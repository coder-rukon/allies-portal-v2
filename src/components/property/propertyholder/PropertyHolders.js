import React, { Component } from 'react';
import Button from '../../forms/button';
import PropertyHolder from './PropertyHolder';

class PropertyHolders extends Component {
    constructor(props){
        super(props);
        this.state = {
            propertyHolders: this.props.data ? this.props.data : [{}]
        }
        this.pHolderComponents = []
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    componentDidMount(){
        
    }
    getData() {
        let data = [];
        if(this.props.multiple !== true){
            data.push(this.pHolderComponents[0].component.getData());
        }else{
            this.pHolderComponents.forEach(item => {
                data.push(item.component.getData());
            })
        }
        
        return data;
    }
    getBlankPropertyHolder(){
        return {

        }
    }
    
    addNewHolder(){
        let propertyHolders = this.state.propertyHolders;
        propertyHolders.push(this.getBlankPropertyHolder())
        this.setState({
            propertyHolders:propertyHolders
        })
    }
    
    getAddButton(){
        if(this.props.disable || !this.props.multiple){
            return <></>
        }
        return(
            <div className="adv_add_new_btn"><div  onClick={ this.addNewHolder.bind(this)}> <img src="/images/icons/plus-icon.png" /> <span>{this.props.btnLabel ? this.props.btnLabel : '+ Add Additional Tenant'}</span></div></div>
        )
    }
    onPropertyHolderReady(uid,obj){
        let allPHC = this.pHolderComponents;
        if(!allPHC.find( item => item.uid == uid)){
            this.pHolderComponents.push({
                uid:uid,
                component:obj
            })
        }
        
    }
    render() {
        return (
            <div className='property_olders'>
                <div className='property_holders_list'>
                    {
                        this.state.propertyHolders.map( (property_company,key) => {
                            if(this.props.multiple !== true && key >= 1){
                                return <div key={key}></div>
                            }
                            return(
                                <PropertyHolder disable={this.props.disable} data={property_company} key={key} onReady={ this.onPropertyHolderReady.bind(this)} enableDelete={key >=1 ? true : false}/>
                            )
                        })
                    }
                </div>
                {this.getAddButton()}
            </div>
        );
    }
}

export default PropertyHolders;