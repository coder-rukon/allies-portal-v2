"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Api from '@/inc/Api';

let MainHeader = () =>{
    const router = useRouter();
    const [user, setUser] = useState({
        user:null,
        isCalledApi:false
    })
    
    let loadUser = () => {
        let api = Api;
        api.setUserToken();
        api.axios().get('/me',function(res){
            if(res.data.type){
                setUser({
                    isCalledApi:true,
                    user:res.data.data.user
                })
            }else{
                setUser({
                    isCalledApi:true,
                    user:null
                })
            }
        }).catch( error => {
            setUser({
                isCalledApi:true,
                user:null
            })
        })
    }
    useEffect(() => {
        loadUser();
    },[]);
    if(user.isCalledApi && !user.user){
        router.push('/login');
    }
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