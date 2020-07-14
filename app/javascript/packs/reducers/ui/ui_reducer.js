import { combineReducers } from 'redux';
import filtersReducer from './filters/filters_reducer';
import openSpellsReducer from './open_spells_reducer';
import focusSpellReducer from './focus_spell_reducer';
import modalReducer from './modal_reducer';
import editSpellReducer from './edit_spell_reducer';

const uiReducer = combineReducers({
    filters: filtersReducer,
    openSpells: openSpellsReducer,
    focusSpell: focusSpellReducer,
    modal: modalReducer,
    editSpell: editSpellReducer
});

export default uiReducer;