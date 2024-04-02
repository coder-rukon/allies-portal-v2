"use client"
import { Component } from "react";
import ErrorMessage from '@/components/widget/errormessage';
import $ from 'jquery';
import { Select2 } from "select2";
import '../../../node_modules/select2/dist/css/select2.min.css';
class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.id ? this.props.id: this.props.name;
        this.select2Obj = null;
        this.isEventApplied = false;
    }
    onChangeHanlder(event){
        if(this.props.onChange){
            this.props.onChange(event);
        }
    }
    componentDidMount(){
        this.choosenObj = $('#'+this.id).select2();
        if(this.props.onSelect2Ready){
            this.props.onSelect2Ready(this.select2Obj);
        }
        let that = this;
        if(!this.isEventApplied){
            this.isEventApplied = true;
            this.choosenObj.on("change", function (e) { 
                that.onChangeHanlder(e)
            });
        }
        
    }
    
    getInputBox(){
        if(this.props.disable){
            return <div className="disable_input">{this.props.value}</div>
        }
        
        return (
            <select 
                className="form-select"
                name={this.props.name ? this.props.name: ''}
                id={this.id}
                placeholder={this.props.placeholder ? this.props.placeholder: ''}
                onChange = {this.onChangeHanlder.bind(this)}
                value = {this.props.value}
            >
                <option value={''}>Please select</option>
                {
                    this.props.options.map( (item,key) => {
                        if(item.items){
                            return(
                                <optgroup label={item.label} key={key}>
                                    {
                                        item.items.map( (itemIn,keyIn) => {
                                            return itemIn.value === this.props.value ?  <option key={keyIn} value={itemIn.value} selected={true}>{itemIn.label}</option> : <option key={keyIn} value={itemIn.value}>{itemIn.label}</option>
                                        })
                                    }
                                    
                                </optgroup>
                            )
                        }else{
                            return item.value === this.props.value ?  <option key={key} value={item.value} selected={true}>{item.label}</option> : <option key={key} value={item.value}>{item.label}</option>
                        }
                    })
                }
                
            </select>
        )
    }
    render() { 
        let wrapperClass = this.props.className ? "form-group rs_form_group " + this.props.className : "form-group rs_form_group";
        return ( 
            <div className={wrapperClass}>
                { this.props.label ? <label className="rs_form_label">{this.props.label}</label> : ''}
                { this.getInputBox() }
                <ErrorMessage errors={this.props.errors} field={this.props.name} />
            </div>
         );
    }
}
 
export default Dropdown;