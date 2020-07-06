import { combineReducers } from 'redux';
import filtersReducer from './filters/filters_reducer';
import openSpellsReducer from './open_spells_reducer';

const uiReducer = combineReducers({
    filters: filtersReducer,
    openSpells: openSpellsReducer
});

export default uiReducer;