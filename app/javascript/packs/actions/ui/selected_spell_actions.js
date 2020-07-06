import {OPEN_SPELL, FOCUS_SPELL} from '../types';

// Standard actions

export const openSpell = (id) => ({
    type: OPEN_SPELL,
    id: id
});

export const focusSpell = (id) => ({
    type: FOCUS_SPELL,
    id: id
});
