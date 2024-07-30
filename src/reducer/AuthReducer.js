import ActionsTypes from "../inc/ActionTypes";

let defaultState = {
    user:{},
    isLogin:false
}
const AuthReducer = (state = defaultState, actions) => {
    if(actions.type === ActionsTypes.SET_LOGIN){
        state = {
            ...state,
            isLogin:true,
            user:actions.user
        }
    }
    if(actions.type === ActionsTypes.SET_USER){
        state = {
            ...state,
            user:actions.user
        }
    }
    if(actions.type === ActionsTypes.SET_LOGOUT){
        state = {
            ...state,
            isLogin:false,
            user:{}
        }
    }
    return state;
}

export default AuthReducer;