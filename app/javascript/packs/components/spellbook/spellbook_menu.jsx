import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faScroll, faUserPlus, faShare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { closeAllSpells } from '../../actions/ui/selected_spell_actions';

const SpellbookMenu = ({editMode}) => {

    const dispatch = useDispatch();

    const handleCreateButton = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm") );
    }

    const handleAddClassButton = (event) => {
        event.preventDefault();
        dispatch( openModal("CreateClass") );
    }

    const handleCloseButton = (event) => {
        event.preventDefault();
        dispatch( closeAllSpells() );
    }

    const handleShareButton = (event) => {
        event.preventDefault();
        dispatch( openModal("Share") );
    }

    return(
        <aside id="spell-menu">
            {editMode ?
                <>
                <section className="spell-menu-item" onClick={e => handleCreateButton(e) }>
                    <label>Create Spell</label>
                    <FontAwesomeIcon icon={faScroll}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleAddClassButton(e)}>
                    <label>Create Class</label>
                    <FontAwesomeIcon icon={faUserPlus}/>
                </section>
                </>
            : <></>}
                <section className="spell-menu-item" onClick={e => handleShareButton(e) }>
                    <label>Share Spellbook</label>
                    <FontAwesomeIcon icon={faShare}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleCloseButton(e) }>
                    <label>Close All Spells</label>
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </section>
        </aside>
    );
};

export default SpellbookMenu;