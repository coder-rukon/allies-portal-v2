import { Component } from "react";
import './login.css';
import Header from "../components/loginregister/Header";
import Footer from "../components/loginregister/Footer";
import RegisterForm from "../components/loginregister/RegisterForm";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        return (
            <div className="login_reg_page">
                <Header/>
                <div className="lr_page_inner">
                    <div className="container">
                        <div className="log_reg_row">
                            <div className="left_side">
                                <img className="login_reg_banner" src="/images/login-register-banner.jpg"/>
                            </div>
                            <div className="right_side">
                                <div className="login_box">
                                    <RegisterForm/>
                                    {
                                        /**
                                         <h3> Don't have account ?</h3>
                                    <p>If you want to register with our platform pleaes click the register button</p>
                                    <Button href="/register" label="Register" />
                                         */
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                </div>
                <Footer/>
            </div>
        );
    }
}
 
export default Login;