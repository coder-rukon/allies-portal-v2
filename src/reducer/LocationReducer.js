import ActionsTypes from "../inc/ActionTypes";

let defaultState = {
    country:[],
    state:[],
    isLoaded:false
}
const LocationReducer = (state = defaultState, actions) => {
    if(actions.type === ActionsTypes.SET_LOCATION_COUNTRY){
        state = {
            ...state,
            country:actions.data
        }
    }
    return state;
}

export default LocationReducer;