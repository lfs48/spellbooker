import { combineReducers } from 'redux';
import spellsReducer from './spells_reducer';

const rootReducer = combineReducers({
    spells: spellsReducer
});

export default rootReducer;