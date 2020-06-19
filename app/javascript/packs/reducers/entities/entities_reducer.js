import { combineReducers } from 'redux';
import spellsReducer from './spells_reducer';
import dndclassReducer from './dndclass_reducer'

const rootReducer = combineReducers({
    spells: spellsReducer,
    dndclasses: dndclassReducer
});

export default rootReducer;