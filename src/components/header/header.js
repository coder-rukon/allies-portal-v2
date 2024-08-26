"use client"

import ActionsTypes from "@/inc/ActionTypes";
import Api from "@/inc/Api";
import Helper from "@/inc/Helper";
import Settings from "@/inc/Settings";
import Link from "next/link";
import { useState ,useEffect} from "react";
import { connect } from "react-redux";
import $ from 'jquery';
let MainHeader = (props) =>{
    let loadSubtypes = () =>{
        let api = Api;
        api.setUserToken();
        api.axios().get('/property-subtype').then(res => {
            props.setPropertySubtype(res.data.data)
        })
    }
    let loadCompanyAcess = () => {
        let  api = Api;
        if(api.setUserToken()){
            
            api.axios().get('/user/access').then(res => {
                props.setCompanyAcess(res.data.data);
            })
        }
    }
    useEffect(() => {
        // call api or anything
        $(document).on('security_reload', function(event, data) {
            loadCompanyAcess();
        });
        loadCompanyAcess();
        loadSubtypes();
    },[]);
    let logout = () =>{
        props.logout();
        Helper.setCookie(Settings.userTokenKey,'',0);
        window.location.href = '/login';
    }
    
    let user = props.auth.user;
    return(
        <div className="main_header">
            <h3 className="h_title" id="h_title">{props.header_title}</h3>
            <div className="mh_right_side">
                <div className="searchbar">
                    <span className="material-symbols-outlined s_icon">search</span>
                </div>
                <div className="notification_bar">
                    <span className="material-symbols-outlined notification_icon">notifications</span>
                </div>

                <div className="profile_dropdown_section">
                    <Link href="/my-account/profile" className="profile_controler">
                        <img src="/images/profile.png" />
                        <span className="user_name_role">
                            <strong>{user.first_name + ' ' + user.last_name }</strong>
                            {user.user_role}
                        </span>
                        <span className="material-symbols-outlined dp_icon">
                        keyboard_arrow_down
                        </span>
                        
                    </Link>
                    <div className="dropdown_contents">
                        <ul>
                            <li><Link href="/my-account/profile">My Profile</Link></li>
                            <li>
                                <div className="logout_btn"  onClick={logout}>
                                    <span className="material-symbols-outlined">Logout</span> Sign Out
                                </div>    
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    header_title: state.options.title,
    auth:state.auth
});
const mapDispatchToProps = (dispatch) => ({
    logout: () => { dispatch({type:ActionsTypes.SET_LOGOUT})},
    setPropertySubtype: (subtype) => { dispatch({type:ActionsTypes.SET_PROPERTY_SUBTYPE,subtype:subtype})},
    setCompanyAcess:(data) => { dispatch({type:ActionsTypes.SET_COMPANY_ACCESS,data:data})},
    //setState: (data) => dispatch({type:ActionsTypes.SET_LOCATION_STATE,data:data}), // Map your state to props
});
export default connect(mapStateToProps,mapDispatchToProps) (MainHeader);