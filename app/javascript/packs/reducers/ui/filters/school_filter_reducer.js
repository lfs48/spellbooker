import {merge} from 'lodash';
import { SELECT_SCHOOL, RECEIVE_SPELLBOOK } from '../../../actions/types';

const schoolFilterReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SELECT_SCHOOL:
            return action.school;
        
        case RECEIVE_SPELLBOOK:
            return null;
    }
};

export default schoolFilterReducer;