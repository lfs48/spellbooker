import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/ui/modal_actions';

const SpellbookMenu = () => {

    const dispatch = useDispatch();

    const handleCreateButton = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm") );
    }


    return(
        <aside>
            <button onClick={e => handleCreateButton(e)}>+</button>
        </aside>
    );
};

export default SpellbookMenu;