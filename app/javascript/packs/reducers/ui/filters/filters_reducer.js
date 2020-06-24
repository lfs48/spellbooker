import { combineReducers } from 'redux';
import classFilterReducer from './class_filter_reducer';
import levelFilterReducer from './level_filter_reducer';
import schoolFilterReducer from './school_filter_reducer';

const filtersReducer = combineReducers({
    classFilter: classFilterReducer,
    levelFilter: levelFilterReducer,
    schoolFilter: schoolFilterReducer
});

export default filtersReducer;