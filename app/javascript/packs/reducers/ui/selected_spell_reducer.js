import {merge} from 'lodash';
import { SELECT_SPELL, RECEIVE_SPELLBOOK } from '../../actions/types';

const selectedSpellReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SELECT_SPELL:
            return action.id;
        
        case RECEIVE_SPELLBOOK:
            return 1;
    }
};

export default selectedSpellReducer;