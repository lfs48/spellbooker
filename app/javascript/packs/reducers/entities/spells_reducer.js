import {merge} from 'lodash';
import { RECEIVE_SPELLBOOK } from '../../actions/types';

const spellsReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case RECEIVE_SPELLBOOK:
            return action.spellbook.spells
    }
};

export default spellsReducer;