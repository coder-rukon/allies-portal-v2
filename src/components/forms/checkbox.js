import { Component } from "react";
import ErrorMessage from '@/components/widget/errormessage';
class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.id = "id" + Math.random().toString(16).slice(2);
        this.state = {
            isChecked: this.props.checked && this.props.checked =='yes' ? 'yes' : 'no'
        }
    }
    onChangeHanlder(event){
        let that = this;
        this.setState({
            isChecked: this.state.isChecked == 'yes' ? 'no' : 'yes'
        },function(){
            if(that.props.onChange){
                that.props.onChange(event,that.state.isChecked);
            }
        })
        
    }
    onClickHanlder(event){
        if(this.props.onClick){
            this.props.onClick(event);
        }
    }
    getInputBox(){
        if(this.props.disable){
            return (
                <div className="form-check form-switch">
                    <input  className="form-check-input" type="checkbox" id={this.id} checked = {this.state.isChecked == 'yes' ? true : false }/>
                    <label className="form-check-label" >{this.props.title}</label>
              </div>
            )
        }
        
        return (
            <div className="form-check form-switch">
                <input name={this.props.name} className="form-check-input" type="checkbox" id={this.id} checked = {this.state.isChecked == 'yes' ? true : false } onClick={this.onChangeHanlder.bind(this)}/>
                <label className="form-check-label"  onClick={this.onChangeHanlder.bind(this)}>{this.props.title}</label>
          </div>
        )
    }
    render() { 
        console.log(this.state.isChecked)
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
 
export default Checkbox;