import { Component } from "react";
import './login.css';
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Api from "@/inc/Api";
import Helper from "@/inc/Helper";
import Settings from "@/inc/Settings";
import Router from 'next/router';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            message:null,
            user:{
                email:'',
                device_name:'user',
                password: ''
            }
        }
    }
    login(event) {
        let that = this, api = Api;
        that.setState({
            loading:true,
            message:null,
        })
        api.axios().post('/login',this.state.user).then(res=>{
            
            that.setState({
                message:res.data.message,
                loading:false
            })
            if(res.data.type){
                Helper.setCookie(Settings.userTokenKey,res.data.data.token,30);
                Router.push('/dashboard');
            }
        }).catch(error=>{
            that.setState({
                loading:false
            })
        })
    }
    onInputChangeHandler(event){
        let user = this.state.user;
        user[event.target.name]= event.target.value;
        this.setState({
            user: user
        })
    }
    render() { 
        let user = this.state.user;
        console.log(this.props)
        return (
            <div className="login_reg_page">
                <div className="login_box">
                    {this.state.message ? <p className="error" style={{color:'red'}} dangerouslySetInnerHTML={{__html:this.state.message}} /> : ''}
                    <Input name="email" label="User email" value={user.email} onChange={ this.onInputChangeHandler.bind(this)}/>
                    <Input name="password" type="password" value={user.password}  label="Password" onChange={ this.onInputChangeHandler.bind(this)}/>
                    <Button label="Login" onClick={ this.login.bind(this)}/>
                </div>
            </div>
        );
    }
}
 
export default Login;