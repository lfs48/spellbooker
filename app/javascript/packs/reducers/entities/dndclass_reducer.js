import {merge} from 'lodash';
import { RECEIVE_SPELLBOOK } from '../../actions/types';
import {dndclassList} from '../../data/dndclasses';

const dndclasses = {};
dndclassList.forEach(dndclass => dndclasses[dndclass] = []);

const dndclassReducer = (state = {}, action) => {
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        case RECEIVE_SPELLBOOK:
            const spells = Object.values(action.spellbook.spells);
            spells.forEach( (spell, i) => {
                spell.classes.split(",").forEach( (dndclass) => {
                    dndclasses[dndclass].push(i);
                })
            });
            return dndclasses;
    }
};

export default dndclassReducer;