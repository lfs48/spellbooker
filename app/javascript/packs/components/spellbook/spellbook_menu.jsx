import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faScroll, faUserPlus, faShare, faTimesCircle, faUndo } from '@fortawesome/free-solid-svg-icons'
import { closeAllSpells } from '../../actions/ui/selected_spell_actions';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { useLocation } from 'react-router-dom';

const SpellbookMenu = ({editMode}) => {

    const dispatch = useDispatch();
    const location = useLocation();

    const {bookName} = useSelector(
        state => ({
            bookName: state.entities.spellbook.name
        })
    );

    const handleCreateButton = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm") );
    }

    const handleAddClassButton = (event) => {
        event.preventDefault();
        dispatch( openModal("CreateClass") );
    }

    const handleResetButton = (event) => {
        event.preventDefault();
        dispatch( openModal("Reset") );
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
        <header id="spell-menu">
            <b>{bookName}</b>
            <section id="menu-button-section">
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
                <section className="spell-menu-item" onClick={e => handleResetButton(e) }>
                    <label>Reset to SRD</label>
                    <FontAwesomeIcon icon={faUndo}/>
                </section>
                </>
            : <></>}
                <section className="spell-menu-item" onClick={e => handleShareButton(e) }>
                    <label>Share</label>
                    <FontAwesomeIcon icon={faShare}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleCloseButton(e) }>
                    <label>Close All Spells</label>
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </section>
            </section>
        </header>
    );
};

export default SpellbookMenu;