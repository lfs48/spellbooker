import { combineReducers } from 'redux';
import filtersReducer from './filters/filters_reducer';

const uiReducer = combineReducers({
    filters: filtersReducer
});

export default uiReducer;