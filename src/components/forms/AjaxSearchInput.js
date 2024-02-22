import { Component } from "react";
import ErrorMessage from '@/components/widget/errormessage';
import Loading from '@/components/widget/Loading';
import Api from "@/inc/Api";
/**
 * resultTitle : 
 * sUrl : url of search
 * onItemClick : func
 */
class AjaxSearchInput extends Component {
    constructor(props) {
        super(props);
        this.sUrl = this.props.sUrl ? this.props.sUrl : '';
        this.state = {
            sValue:'',
            isLoading:false,
            sResult:[]
        }
        this.ajaxCalled = null;
    }
    onChangeHanlder(event){
        clearTimeout(this.ajaxCalled);
        this.setState({
            sValue:event.target.value,
            isLoading:true,
            sResult:[]
        })
        if(event.target.value == ''){
            this.setState({
                isLoading:false
            })
            return;
        }
        let that = this, api = Api;
        
        this.ajaxCalled = setTimeout(function(){
            if(api.setUserToken()){
                api.axios().get(that.sUrl +'/?s='+that.state.sValue).then(res => {
                    that.setState({
                        isLoading:false,
                        sResult: res.data.type ? that.props.filterResult(res.data.data) : []
                    })
                })
            }
        },300)
    }
    getInputBox(){
        if(this.props.disable){
            return <div className="disable_input">{this.props.value}</div>
        }
        return (
            <input 
                name={this.props.name ? this.props.name: ''}
                type={this.props.type ? this.props.type: 'text'}
                className="form-control" 
                id={this.props.id ? this.props.id: ''}
                placeholder={this.props.placeholder ? this.props.placeholder: ''}
                onChange = {this.onChangeHanlder.bind(this)}
                value={this.state.sValue}
            />
        )
    }
    onItemClick(item,event){
        console.log(event,item)
        if(this.props.onItemClick){
            this.props.onItemClick(item);
        }
        this.setState({
            sResult:[]
        })
    }
    getResultOutput(){
        if(this.state.isLoading){
            return <div className="search_output_area text-center pt-2"><Loading/></div>
        }
        if( this.state.sResult.length <=0){
            return<></>
        }
        return(
            <div className="search_output_area">
                <div className="search_output">
                    
                    <ul>
                        {
                            this.state.sResult.map( (item,key) => {
                                return <li key={key} onClick={ this.onItemClick.bind(this,item)} >{item.item_label}</li>

                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    render() { 
        
        let wrapperClass = this.props.className ? "form-group rs_form_group " + this.props.className : "form-group rs_form_group";
        return ( 
            <div className={wrapperClass}>
                { this.props.label ? <label className="rs_form_label">{this.props.label}</label> : ''}
                { this.getInputBox() }
                {this.getResultOutput()}
                
                <ErrorMessage errors={this.props.errors} field={this.props.name} />
            </div>
         );
    }
}
 
export default AjaxSearchInput;