import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
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

    return(
    <section id="spellbook-container">
        <SpellList />
        <section id="spell-section-right">
            <Filter />
            <Spell />
        </section>
    </section>
    );
}

export default Spellbook;