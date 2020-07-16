import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/ui/modal_actions';

const DeleteSpellConfirmation = () => {

    const dispatch = useDispatch();

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    return(
        <form>
            <h1>Delete Spell?</h1>
            <button onClick={e => handleCancel(e)}>Cancel</button>
            <button>Confirm</button>
        </form>
    );
};

export default DeleteSpellConfirmation;