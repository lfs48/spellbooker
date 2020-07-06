import { combineReducers } from 'redux';
import filtersReducer from './filters/filters_reducer';
import selectedSpellsReducer from './selected_spells_reducer';

const uiReducer = combineReducers({
    filters: filtersReducer,
    selectedSpells: selectedSpellsReducer
});

export default uiReducer;