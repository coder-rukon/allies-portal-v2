import ActionsTypes from "../inc/ActionTypes";

let defaultState = {
    title:''
}
const OptionsReducer = (state = defaultState, actions) => {
    if(actions.type === ActionsTypes.SET_OPTION){
        state = {
            ...state,
            ...actions.data
        }
    }
    return state;
}

export default OptionsReducer;