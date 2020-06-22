import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {fetchSpellbook} from '../actions/entities/spell_actions'; 
import SpellList from './spell_list';
import Filter from './filter';
import Spell from './spell';

const Spellbook = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchSpellbook({url: "srd"}))
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