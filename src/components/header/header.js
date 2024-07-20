"use client"

import ActionsTypes from "@/inc/ActionTypes";
import Helper from "@/inc/Helper";
import Settings from "@/inc/Settings";
import { useState } from "react";
import { connect } from "react-redux";

let MainHeader = (props) =>{

    let logout = () =>{
        props.logout();
        Helper.setCookie(Settings.userTokenKey,'',0);
        window.location.href = '/login';
    }
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
                    <div className="profile_controler">
                        <img src="/images/profile.png" />
                        <span className="material-symbols-outlined dp_icon">
                        keyboard_arrow_down
                        </span>
                        
                    </div>
                    
                </div>
                <div className="logout_controller">
                    <span className="material-symbols-outlined" onClick={logout}>Logout</span>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    header_title: state.options.title
});
const mapDispatchToProps = (dispatch) => ({
    logout: () => { dispatch({type:ActionsTypes.SET_LOGOUT})}
    //setState: (data) => dispatch({type:ActionsTypes.SET_LOCATION_STATE,data:data}), // Map your state to props
});
export default connect(mapStateToProps,mapDispatchToProps) (MainHeader);