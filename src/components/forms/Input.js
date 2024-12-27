import { Component } from "react";
import ErrorMessage from '@/components/widget/errormessage';
import InputRadio from "./inputradio";
class Input extends Component {
    constructor(props) {
        super(props);
    }
    onChangeHanlder(event){
        if(this.props.onChange){
            this.props.onChange(event);
        }
    }
    onClickHanlder(event){
        if(this.props.onClick){
            this.props.onClick(event);
        }
    }
    getInputBox(){
        if(this.props.disable){
            return <div className="disable_input">{this.props.value}</div>
        }
        if(this.props.type && this.props.type == 'textarea' ){
            return(
                <textarea 
                    name={this.props.name ? this.props.name: ''}
                    className="form-control" 
                    id={this.props.id ? this.props.id: ''}
                    placeholder={this.props.placeholder ? this.props.placeholder: ''}
                    onChange = {this.onChangeHanlder.bind(this)}
                    onClick =  {this.onClickHanlder.bind(this)}
                    value = {this.props.value}
                />
            )
        }
        return (
            <input 
                name={this.props.name ? this.props.name: ''}
                type={this.props.type ? this.props.type: 'text'}
                className="form-control" 
                id={this.props.id ? this.props.id: ''}
                placeholder={this.props.placeholder ? this.props.placeholder: ''}
                onChange = {this.onChangeHanlder.bind(this)}
                onClick =  {this.onClickHanlder.bind(this)}
                value = {this.props.value}
            />
        )
    }
    getOptions(){
        if(!this.props.options){
            return <></>
        }
        if(this.props.disable == true){
            return <div className="dropbox_selected_value">{this.props?.dropdownValue}</div> 
        }
        return(
            <div className={this.props.disable == true ? 'rs_option_group disabled' : 'rs_option_group'}>
                {
                    this.props.options.map( (optionItem, key) => {
                        return <InputRadio {...optionItem} key={key} />
                    })
                }
            </div>
        )
    }
    render() { 
        let hasOptions = this.props.options ? true : false;
        let classForOptionsGroup = hasOptions ? ' with_options ' : '';
        let wrapperClass = this.props.className ? "form-group rs_form_group "+ classForOptionsGroup + this.props.className :  classForOptionsGroup +" form-group rs_form_group";
        return ( 
            <div className={wrapperClass}>
                { this.props.label ? <label className="rs_form_label">{this.props.label}</label> : ''}
                { hasOptions ? <div className="rs_options_box_wraper">{this.getInputBox() } {this.getOptions()} </div> : this.getInputBox()  }
                <ErrorMessage errors={this.props.errors} field={this.props.errorName ? this.props.errorName : this.props.name} />
                {this.props.afterInput ? this.props.afterInput() : ''}
            </div>
         );
    }
}
 
export default Input;