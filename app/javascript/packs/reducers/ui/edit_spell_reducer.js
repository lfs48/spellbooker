import {merge} from 'lodash';
import { CLOSE_MODAL, EDIT_SPELL, RECEIVE_SPELLBOOK } from '../../actions/types';

const editSpellReducer = (state = {}, action) => {
    const newState = merge([], state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case EDIT_SPELL:
            newState.id = action.id;
            return newState;

        case RECEIVE_SPELLBOOK:
        case CLOSE_MODAL:
            newState.id = null;
            return newState;
    }
};

export default editSpellReducer;