import React, { Component } from 'react';
import Button from '../forms/button';
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Popup from '@/components/widget/Popup';
import PropertyListPage from '@/app/property/PropertyListPage';

class LinkedProperty extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            showPopup:false,
            property:[]
        }
        this.searchTimeOut = null;
    }
    componentDidMount(){
        this.loadProperty();
    }
    loadProperty(){

    }
    onPropertySelect(property,row,cell){
        this.setState({
            showPopup:false
        })
        console.log(property,row,cell)
    }
    searchForm(){
        if(!this.state.showPopup){
            return <></>
        }
        return (
            <Popup width="80%" onClose={ () => { this.setState({ showPopup:false })}}>
                <PropertyListPage onPropertyClick={this.onPropertySelect.bind(this)}/>
            </Popup>
        )
    }
    render() {
        return (
            <div className='linked_property'>
                <div className="property_links">
                    <p>No Linked Properties</p>
                </div>
                {
                    this.searchForm()
                }
                {!this.state.showPopup ? <Button label="+ Link Property" onClick={ e => { this.setState({showPopup:true})}}/> : '' }
            </div>
        );
    }
}

export default LinkedProperty;