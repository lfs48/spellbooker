import { combineReducers } from 'redux';
import spellsReducer from './spells_reducer';
import spellbookReducer from './spellbook_reducer';

const rootReducer = combineReducers({
    spells: spellsReducer,
    spellbook: spellbookReducer
});

export default rootReducer;