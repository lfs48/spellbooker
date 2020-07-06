import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Spell from './spell';

const OpenSpells = () => {

    const {openSpellIDs, focusID, spells} = useSelector(
        state => ({
            openSpellIDs: state.ui.openSpells,
            focusID: state.ui.focusSpell,
            spells: state.entities.spells,
        })
    );

    let openSpells = <></>;
    if (openSpellIDs.length > 0) {
        openSpells = openSpellIDs.map( (spellID, i) => {
            return <Spell key={i} spell={spells[spellID]} isFocus={focusID === spellID}/>
        });
    };

    return(
    <ul id="spellbook-container">
        {openSpells}
    </ul>
    );
}

export default OpenSpells;