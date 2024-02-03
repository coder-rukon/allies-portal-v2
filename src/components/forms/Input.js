import { Component } from "react";
class Input extends Component {
    constructor(props) {
        super(props);
    }
    onChangeHanlder(event){
        if(this.props.onChange){
            this.props.onChange(event);
        }
    }
    getInputBox(){
        if(this.props.type && this.props.type == 'textarea' ){
            return(
                <textarea 
                    name={this.props.name ? this.props.name: ''}
                    className="form-control" 
                    id={this.props.id ? this.props.id: ''}
                    placeholder={this.props.placeholder ? this.props.placeholder: ''}
                    onChange = {this.onChangeHanlder.bind(this)}
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
                value = {this.props.value}
            />
        )
    }
    render() { 
        
        let wrapperClass = this.props.className ? "form-group rs_form_group " + this.props.className : "form-group rs_form_group";
        return ( 
            <div className={wrapperClass}>
                { this.props.label ? <label className="rs_form_label">{this.props.label}</label> : ''}
                { this.getInputBox() }
                
            </div>
         );
    }
}
 
export default Input;