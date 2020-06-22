import {merge} from 'lodash';
import { SELECT_CLASS, RECEIVE_SPELLBOOK } from '../../../actions/types';

const classFilterReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SELECT_CLASS:
            return action.dndclass;
        
        case RECEIVE_SPELLBOOK:
            return null;
    }
};

export default classFilterReducer;