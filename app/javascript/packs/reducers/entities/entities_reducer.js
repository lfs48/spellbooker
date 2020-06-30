import { combineReducers } from 'redux';
import spellsReducer from './spells_reducer';
import dndclassReducer from './dndclass_reducer'
import spellbookReducer from './spellbook_reducer';

const rootReducer = combineReducers({
    spells: spellsReducer,
    spellbook: spellbookReducer,
    dndclasses: dndclassReducer
});

export default rootReducer;