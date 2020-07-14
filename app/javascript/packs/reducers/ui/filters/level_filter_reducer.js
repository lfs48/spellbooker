import {merge} from 'lodash';
import { SELECT_LEVEL, RECEIVE_SPELLBOOK } from '../../../actions/types';

const levelFilterReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SELECT_LEVEL:
            return action.level;
    }
};

export default levelFilterReducer;