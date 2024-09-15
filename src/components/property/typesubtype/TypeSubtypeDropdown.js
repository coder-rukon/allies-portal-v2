import Checkbox from '@/components/forms/checkbox';
import InputRadio from '@/components/forms/inputradio';
import Api from '@/inc/Api';
import Helper from '@/inc/Helper';
import React, { Component } from 'react';
import $ from 'jquery';
import Loading from '@/components/widget/Loading';
import { connect } from 'react-redux';
class TypeSubtypeDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            isRerendering:false,
            showDropdown:false,
            allSubtypes:[],
            selectedSubtypes:[]
        }
    }
    componentDidMount(){
        this.loadSubtypes();
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    getData(){
        return this.state.selectedSubtypes;
    }
    setData(){
        if(this.props.data){
            this.props.data.forEach(element => {
                this.addSubtypeById(element.subtype_id)
            });
        }
    }
    loadSubtypes(){
        let api = Api, that = this;
        that.setState({
            loading:true
        })
        api.setUserToken();
        api.axios().get('/property-subtype').then(res => {
            
            that.setState({
                loading:false,
                allSubtypes:res.data.data
            },() => {
                that.setData();
            })
        })
    }
    deleteItem(subtype_id){
        let selectedSubtypes = this.state.selectedSubtypes;
        let newSelectedItems = selectedSubtypes.filter(item => { return item.subtype_id == subtype_id ? null : item} );
        this.setState({
            isRerendering:true,
        },function(){
            this.setState({
                isRerendering:false,
                selectedSubtypes:newSelectedItems
            })
        })
    }
    addSubtypeById(subtype_id){
        let allSubtypes = this.props.allSubtypes;
        let selectedSubtypes = this.state.selectedSubtypes;
        if(selectedSubtypes.find( item => item.subtype_id === subtype_id )){
            return;
        }
        let subtype = allSubtypes.find(item => item.subtype_id === subtype_id)
        selectedSubtypes.push(subtype)
        this.setState({
            isRerendering:true,
        },function(){
            this.setState({
                isRerendering:false,
                selectedSubtypes:selectedSubtypes
            })
        })
        
    }
    onPropertySubTypeChange(event,isChecked,data){
        if(isChecked == 'yes'){
            this.addSubtypeById(data.value)
        }else{
            this.deleteItem(data.value)
        }
    }
    onGroupControllerClick(event){
        $(event.target).closest('.type_subtype_group_wraper').toggleClass('active');
    }
    isSubtypeSelected(subtype_id){
        let selectedSubtypes = this.state.selectedSubtypes;
        let selectedSubtype = selectedSubtypes.find(item =>  item.subtype_id == subtype_id );
        if(typeof selectedSubtype === "undefined"){
            return false;
        }
        return selectedSubtype?.subtype_id ? true : false;
    }

    getDropdownContents(){
        if(this.props.disable || !this.state.showDropdown){
            return;
        }

        if(this.state.loading){
            return <Loading/>
        }
        return(
            <div className='dropdown_contents'>
                        {
                            Helper.getPropertyType().map( (pType,key) => {
                                let gorupSubtypes = this.props.allSubtypes.filter( typeItem => typeItem.property_type_id == pType.pt_id )
                                return (
                                    <div key={key} className={ "type_subtype_group_wraper "} >
                                        <h4 onClick={ this.onGroupControllerClick.bind(this)}><div><span class="material-symbols-outlined arrow_drop_down">arrow_drop_down</span><span class="material-symbols-outlined arrow_right">arrow_right</span></div><span>{pType.label}</span></h4>
                                        <div className="pgroup_subtypes">
                                        {
                                            !this.state.isRerendering ? gorupSubtypes.map( ( subtype , keyInner) => {
                                                return(
                                                    <div key={keyInner} className="pgroup_input_wraper">
                                                        { 
                                                            <Checkbox disable={this.props.disable} cb_style="simple" checked={this.isSubtypeSelected(subtype.subtype_id) ? 'yes' : 'no'} onChange={ this.onPropertySubTypeChange.bind(this)} id={'subtype_input_'+subtype.subtype_id} name="item_subtype[]" value={subtype.subtype_id} title={subtype.subtype_name}/>
                                                        }
                                                    </div>
                                                )
                                            }) : ''
                                        }
                                        </div>
                                        
                                    </div>
                                )
                            } )
                        }
                    </div>
        )
    }
    getPropertyTypeName(type_id){
        let pType = Helper.getPropertyType().find( item => item.pt_id == type_id);
        return pType?.label; 
    }
    onDeleteBtnClickHandler(subtype_id){
        this.deleteItem(subtype_id)
        //$('#subtype_input_'+subtype_id).trigger('click');
    }
    onToggleControllerClickHandler(event){
        if(this.props.disable){
            this.setState({
                showDropdown: false
            })
            return false;
        }
        this.setState({
            showDropdown:!this.state.showDropdown
        })
    }
    render() {
        let selectedSubtypes = this.state.selectedSubtypes;
        return (
            <div className={this.props.disable ? 'type_subtype_dropdown_section disable' : 'type_subtype_dropdown_section'}>
                <label className='controller_title'>{this.props.label ? this.props.label : 'Property Type/Subtype'}</label>
                <div className='selector_box' >
                    <div className='selector_input' onClick={ () => { this.onToggleControllerClickHandler() } }>
                        {selectedSubtypes.length <=0 ? <p>Select property type/subtype</p> : ''}
                        {selectedSubtypes.map( (tysub,key) => {
                            return(
                                <div className='selected_item' key={key} >
                                    <strong className='t_name'>{this.getPropertyTypeName(tysub.property_type_id) }</strong>
                                    <span className='st_name'>- {tysub.subtype_name}</span>
                                    {this.props.disable ? '' : <span className="material-symbols-outlined" onClick={e => this.onDeleteBtnClickHandler(tysub?.subtype_id)}>close</span> }
                                </div>
                            )
                        })}
                    </div>
                    {this.getDropdownContents()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        allSubtypes:state.propertyTypeSubtype.subtypes
    }
}
export default connect(mapStateToProps) (TypeSubtypeDropdown);