import {merge} from 'lodash';
import { SEARCH_NAME, RECEIVE_SPELLBOOK } from '../../../actions/types';

const nameSearchReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SEARCH_NAME:
            return action.name;
        
        case RECEIVE_SPELLBOOK:
            return "";
    }
};

export default nameSearchReducer;