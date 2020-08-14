import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {fetchSpellbook} from '../../actions/entities/spell_actions'; 
import SpellList from './spell_list';
import Filter from './filter';
import SpellbookMenu from './spellbook_menu';
import OpenSpells from './open_spells';
import { closeAllSpells } from '../../actions/ui/selected_spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const Spellbook = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    let spellbook_url = location.pathname.slice(11);
    const edit = spellbook_url.includes("edit")
    spellbook_url = spellbook_url.slice( spellbook_url.indexOf("/") + 1 );

    useEffect( () => {
        dispatch( closeModal() );
        dispatch( closeAllSpells() );
        dispatch(fetchSpellbook({url: spellbook_url}))
        .then( res => document.title = res.spellbook.name );
    }, [location]);

    const handleCloseButton = (event) => {
        event.preventDefault();
        dispatch( closeAllSpells() );
    }

    return(
    <section id="spellbook-container">
        <SpellbookMenu editMode={edit}/>
        <section id="below-nav-section">
            <FontAwesomeIcon className="list-button" onClick={e => handleCloseButton(e)} icon={faTimesCircle}/>
            <SpellList />
            <section id="spell-section-right">
                <Filter />
                <OpenSpells editMode={edit} />
            </section>
        </section>
    </section>
    );
}

export default Spellbook;