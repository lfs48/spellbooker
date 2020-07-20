import {merge} from 'lodash';
import { RECEIVE_SPELLBOOK } from '../../actions/types';

const spellbookReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case RECEIVE_SPELLBOOK:
            const spellbook = {
                id: action.spellbook.id,
                name: action.spellbook.name,
                url: action.spellbook.url,
                classes: action.spellbook.classes.split(",")
            };
            return spellbook;
    }
};

export default spellbookReducer;