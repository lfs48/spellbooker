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

const Spellbook = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const spellbook_url = location.pathname.slice(11);

    useEffect( () => {
        dispatch( closeModal() );
        dispatch( closeAllSpells() );
        dispatch(fetchSpellbook({url: spellbook_url}));
    }, [location]);

    return(
    <section id="spellbook-container">
        {spellbook_url != "srd" ? <SpellbookMenu/> : <></> }
        <SpellList />
        <section id="spell-section-right">
            <Filter />
            <OpenSpells />
        </section>
    </section>
    );
}

export default Spellbook;