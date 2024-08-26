import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import OptionsReducer from './OptionsReducer';
import AuthReducer from './AuthReducer';
import CompanyAccessReducer from './CompanyAccessReducer';
import PropertyTypeSubtypeReducer from './PropertyTypeSubtypeReducer'
export const rootReducer = combineReducers({
    locations: LocationReducer,
    options: OptionsReducer,
    auth: AuthReducer,
    companyAccess: CompanyAccessReducer,
    propertyTypeSubtype: PropertyTypeSubtypeReducer
});