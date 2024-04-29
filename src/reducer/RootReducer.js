import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import OptionsReducer from './OptionsReducer';
export const rootReducer = combineReducers({
    locations: LocationReducer,
    options: OptionsReducer
});