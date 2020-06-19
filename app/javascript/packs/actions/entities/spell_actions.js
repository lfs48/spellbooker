import * as SpellsAPIUtil from '../../util/api/spells_api_util';
import {RECEIVE_SPELL, RECEIVE_SPELLBOOK} from '../types';

// Standard actions

const receiveSpellbook = (spellbook) => ({
    type: RECEIVE_SPELLBOOK,
    spellbook: spellbook
})

const receiveSpell = (spell) => ({
    type: RECEIVE_SPELL,
    spell: spell
});

// Thunk actions

export const fetchSpellbook = (data) => (dispatch) => {
    return SpellsAPIUtil.fetchSpellbook(data)
        .then(
            (spellbook) => dispatch( receiveSpellbook(spellbook) )
        );
};

export const createSpellbook = (data) => (dispatch) => {
    return SpellsAPIUtil.createSpellbook(data)
        .then(
            (spellbook) => dispatch( receiveSpellbook(spellbook) )
        );
};

export const createSpell = (data) => (dispatch) => {
    return SpellsAPIUtil.createSpell(data)
        .then(
            (spell) => dispatch( receiveSpell(spell) )
        );
};

export const fetchSpell = (data) => (dispatch) => {
    return SpellsAPIUtil.fetchSpell(data)
        .then(
            (spell) => dispatch( receiveSpell(spell) )
        );
};