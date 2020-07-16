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
            return newState;

        case CLOSE_MODAL:
            newState.name = null;
            newState.data = null;
            return newState;
    }
};

export default modalReducer;