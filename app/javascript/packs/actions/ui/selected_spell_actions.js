import {OPEN_SPELL, FOCUS_SPELL, CLOSE_SPELL, CLOSE_ALL_SPELLS} from '../types';

// Standard actions

export const openSpell = (id) => ({
    type: OPEN_SPELL,
    id: id
});

export const closeSpell = (id) => ({
    type: CLOSE_SPELL,
    id: id
});

export const focusSpell = (id) => ({
    type: FOCUS_SPELL,
    id: id
});

export const closeAllSpells = () => ({
    type: CLOSE_ALL_SPELLS
});