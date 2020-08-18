import {merge} from 'lodash';
import { OPEN_MODAL, CLOSE_MODAL } from '../../actions/types';

const modalReducer = (state = {}, action) => {
    const newState = merge([], state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case OPEN_MODAL:
            newState.name = action.name;
            newState.data = action.data || {};
            newState.open = true;
            return newState;

        case CLOSE_MODAL:
            newState.open = false;
            return newState;
    }
};

export default modalReducer;