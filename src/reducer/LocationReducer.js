import ActionsTypes from "../inc/ActionTypes";

let defaultState = {
    country:[],
    state:[],
    countryLoaded:false,
    stateLoaded:false
}
const LocationReducer = (state = defaultState, actions) => {
    if(actions.type === ActionsTypes.SET_LOCATION_COUNTRY){
        state = {
            ...state,
            countryLoaded:true,
            country:actions.data
        }
    }
    if(actions.type === ActionsTypes.SET_LOCATION_STATE){
        state = {
            ...state,
            stateLoaded:true,
            state:actions.data
        }
    }
    return state;
}

export default LocationReducer;