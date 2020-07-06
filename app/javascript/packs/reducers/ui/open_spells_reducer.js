import {merge} from 'lodash';
import { SELECT_SPELL, RECEIVE_SPELLBOOK } from '../../actions/types';

const openSpellsReducer = (state = {}, action) => {
    const newState = merge([], state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SELECT_SPELL:
            if(!newState.includes(action.id)) { newState.push(action.id); }
            return newState;
        
        case RECEIVE_SPELLBOOK:
            return [];
    }
};

export default openSpellsReducer;