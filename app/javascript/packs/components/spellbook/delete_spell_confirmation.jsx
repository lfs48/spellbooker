import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui/modal_actions';
import {merge} from 'lodash';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { closeSpell } from '../../actions/ui/selected_spell_actions';

const DeleteSpellConfirmation = () => {

    const dispatch = useDispatch();

    const {spells, spellbook, modal} = useSelector(
        state => ({
            spells: state.entities.spells,
            spellbook: state.entities.spellbook,
            modal: state.ui.modal
        })
    )

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleConfirm = (event) => {
        event.preventDefault();
        const newSpells = merge({}, spells);
        delete newSpells[modal.data.id];
        const newSpellbook = merge({}, spellbook);
        newSpellbook.spells = JSON.stringify(newSpells);
        dispatch( closeSpell(modal.data.id) )
        dispatch( updateSpellbook(newSpellbook) );
        dispatch( closeModal() );
    }

    return(
        <form>
            <h1>Delete Spell?</h1>
            <button onClick={e => handleCancel(e)}>Cancel</button>
            <button onClick={e => handleConfirm(e)}>Confirm</button>
        </form>
    );
};

export default DeleteSpellConfirmation;