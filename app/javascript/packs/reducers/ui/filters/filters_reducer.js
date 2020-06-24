import { combineReducers } from 'redux';
import classFilterReducer from './class_filter_reducer';
import levelFilterReducer from './level_filter_reducer';
import schoolFilterReducer from './school_filter_reducer';
import nameSearchReducer from './name_search_reducer';

const filtersReducer = combineReducers({
    classFilter: classFilterReducer,
    levelFilter: levelFilterReducer,
    schoolFilter: schoolFilterReducer,
    nameSearch: nameSearchReducer
});

export default filtersReducer;