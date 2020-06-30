import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {fetchSpellbook} from '../../actions/entities/spell_actions'; 
import SpellList from './spell_list';
import Filter from './filter';
import Spell from './spell';

const Spellbook = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const spellbook_url = location.pathname.slice(11);

    useEffect( () => {
        dispatch(fetchSpellbook({url: spellbook_url}))
    }, []);

    const {spellbookName} = useSelector(
        state => ({
            spellbookName: state.entities.spellbook.name
        })
    );

    return(
    <section id="spellbook-container">
        <SpellList />
        <section id="spell-section-right">
            <header id="spellbook-name-header">{spellbookName}</header>
            <Filter />
            <Spell />
        </section>
    </section>
    );
}

export default Spellbook;