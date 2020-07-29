import {merge} from 'lodash';
import { OPEN_SPELL, CLOSE_SPELL, CLOSE_ALL_SPELLS } from '../../actions/types';

const openSpellsReducer = (state = {}, action) => {
    const newState = merge([], state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case OPEN_SPELL:
            if(!newState.includes(action.id)) { newState.push(action.id); }
            return newState;

        case CLOSE_SPELL:
            return newState.filter( (id) => id != action.id );

        case CLOSE_ALL_SPELLS:
            return [];
    }
};

export default openSpellsReducer;