import React from 'react'
import { useSelector } from 'react-redux';
import Spell from './spell';

const SelectedSpells = () => {

    const {spellbookName, openSpellIDs, spells} = useSelector(
        state => ({
            openSpellIDs: state.ui.selectedSpells,
            spells: state.entities.spells
        })
    );

    let openSpells = <></>;
    if (openSpellIDs.length > 0) {
        openSpells = openSpellIDs.map( (spellID, i) => {
            return <Spell key={i} spell={spells[spellID]} />
        });
    };

    return(
    <ul id="spellbook-container">
        {openSpells}
    </ul>
    );
}

export default SelectedSpells;