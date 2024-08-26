import ActionsTypes from "../inc/ActionTypes";

let defaultState = {
    subtypes:[]
}
const PropertyTypeSubtypeReducer = (state = defaultState, actions) => {
    if(actions.type === ActionsTypes.SET_PROPERTY_SUBTYPE){
        state = {
            ...state,
            subtypes:actions.subtype
        }
    }
    return state;
}

export default PropertyTypeSubtypeReducer;