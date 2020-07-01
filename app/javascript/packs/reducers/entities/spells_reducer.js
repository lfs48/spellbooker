import {merge} from 'lodash';
import { RECEIVE_SPELLBOOK } from '../../actions/types';

const spellsReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case RECEIVE_SPELLBOOK:
            const spells = JSON.parse(action.spellbook.spells);
            return spells;
    }
};

export default spellsReducer;