import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlusSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const SpellbookMenu = () => {

    const dispatch = useDispatch();

    const handleCreateButton = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm") );
    }

    const handleAddClassButton = (event) => {
        event.preventDefault();
    }

    return(
        <aside id="spell-menu">
            <FontAwesomeIcon icon={faPlusSquare} onClick={e => handleCreateButton(e) }/>
            <FontAwesomeIcon icon={faUserPlus} onClick={e => handleAddClassButton(e)} />
        </aside>
    );
};

export default SpellbookMenu;