import {SELECT_SPELL} from '../types';

// Standard actions

export const selectSpell = (id) => ({
    type: SELECT_SPELL,
    id: id
});
