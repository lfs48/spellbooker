import {merge} from 'lodash';
import { SET_SEARCH, RECEIVE_SPELLBOOK } from '../../../actions/types';

const searchReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case SET_SEARCH:
            return action.search;
        
        case RECEIVE_SPELLBOOK:
            return {name: "", desc: ""};
    }
};

export default searchReducer;