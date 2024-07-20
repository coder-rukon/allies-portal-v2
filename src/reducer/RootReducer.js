import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import OptionsReducer from './OptionsReducer';
import AuthReducer from './AuthReducer';
import CompanyAccessReducer from './CompanyAccessReducer';
export const rootReducer = combineReducers({
    locations: LocationReducer,
    options: OptionsReducer,
    auth: AuthReducer,
    companyAccess: CompanyAccessReducer
});