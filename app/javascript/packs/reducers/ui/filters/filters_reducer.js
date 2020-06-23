import { combineReducers } from 'redux';
import classFilterReducer from './class_filter_reducer';
import levelFilterReducer from './level_filter_reducer';

const filtersReducer = combineReducers({
    classFilter: classFilterReducer,
    levelFilter: levelFilterReducer
});

export default filtersReducer;