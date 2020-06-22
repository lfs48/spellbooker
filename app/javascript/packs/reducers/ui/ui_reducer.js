import { combineReducers } from 'redux';
import filtersReducer from './filters/filters_reducer';
import selectedSpellReducer from './selected_spell_reducer';

const uiReducer = combineReducers({
    filters: filtersReducer,
    selectedSpell: selectedSpellReducer
});

export default uiReducer;