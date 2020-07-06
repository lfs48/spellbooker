import {merge} from 'lodash';
import { OPEN_SPELL, FOCUS_SPELL, RECEIVE_SPELLBOOK } from '../../actions/types';

const focusSpellReducer = (state = {}, action) => {
    const newState = merge([], state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case OPEN_SPELL:
        case FOCUS_SPELL:
            return action.id;
        
        case RECEIVE_SPELLBOOK:
            return 0;
    }
};

export default focusSpellReducer;