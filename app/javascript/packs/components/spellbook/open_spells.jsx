import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Spell from './spell';

const OpenSpells = (props) => {

    const {openSpellIDs, focusID, spells} = useSelector(
        state => ({
            openSpellIDs: state.ui.openSpells,
            focusID: state.ui.focusSpell,
            spells: state.entities.spells,
        })
    );

    let openSpells = <></>;
    if (openSpellIDs.length > 0) {
        openSpells = openSpellIDs.map( (spellID) => {
            return <Spell key={spellID} spell={spells[spellID]} editMode={props.editMode} isFocus={focusID === spellID}/>
        });
    };

    return(
    <ul id="open-spells-container">
        {openSpells}
    </ul>
    );
}

export default OpenSpells;