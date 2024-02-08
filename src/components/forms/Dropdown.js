"use client"
import { Component } from "react";
import ErrorMessage from '@/components/widget/errormessage';
class Dropdown extends Component {
    constructor(props) {
        super(props);
    }
    onChangeHanlder(event){
        if(this.props.onChange){
            this.props.onChange(event);
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
                id={this.props.id ? this.props.id: this.props.name}
                placeholder={this.props.placeholder ? this.props.placeholder: ''}
                onChange = {this.onChangeHanlder.bind(this)}
                value = {this.props.value}
            >
                <option value={''}>Please select</option>
                {
                    this.props.options.map( (item,key) => {
                        if(item.items){
                            return(
                                <optgroup label={item.label}>
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