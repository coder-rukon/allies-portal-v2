"use client"

let MainHeader = () =>{
    return(
        <div className="main_header">
            <h3 className="h_title">abcd</h3>
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
            </div>
        </div>
    )
}
export default MainHeader;