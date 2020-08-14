import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { destroySpellbook } from '../../actions/entities/spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';
import { closeAllSpells } from '../../actions/ui/selected_spell_actions';

const Reset = () => {

    const dispatch = useDispatch();

    const location = useLocation().pathname;
    const edit_url = location.slice( location.indexOf("edit/") + 5 );

    const handleClose = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleConfirm = (event) => {
        event.preventDefault();
        const newBook = {}
        newBook.url = edit_url;
        dispatch( closeAllSpells() );
        dispatch( destroySpellbook(newBook, {reset: true}) );
        dispatch( closeModal() );
    }

    return(
        <section id="spellbook-share" className="modal-form">
            <h1>Are you sure you want to reset your spellbook?</h1>
            <h1> This will undo any changes you have made and cannot be undone.</h1>
            <section>
                <button onClick={e => handleClose(e)}>Cancel</button>
                <button onClick={e => handleConfirm(e)}>Confirm</button>
            </section>
        </section>
    );
}

export default Reset;