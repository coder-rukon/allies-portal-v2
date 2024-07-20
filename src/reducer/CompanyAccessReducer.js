import ActionsTypes from "../inc/ActionTypes";

let defaultState = {
    company_access:[],
    roles:[]
}
const CompanyAccessReducer = (state = defaultState, actions) => {
    if(actions.type === ActionsTypes.SET_COMPANY_ACCESS){
        state = {
            ...state,
            company_access:actions.data.company_access,
            roles:actions.data.roles,
        }
    }
    return state;
}

export default CompanyAccessReducer;