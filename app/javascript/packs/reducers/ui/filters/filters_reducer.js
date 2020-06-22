import { combineReducers } from 'redux';
import classFilterReducer from './class_filter_reducer';

const filtersReducer = combineReducers({
    classFilter: classFilterReducer
});

export default filtersReducer;