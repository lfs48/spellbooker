import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpellbook} from '../actions/entities/spell_actions'; 
import {intToOrdinal} from '../util/functions/util_functions'
import {dndclassList} from '../data/dndclasses';

const SpellList = () => {

    const dispatch = useDispatch();

    const [selectedSpellId, setSelectedSpellId] = useState(0);

    const {spells} = useSelector(
        state => ({
            spells: Object.values(state.entities.spells)
        })
    );

    const spellLis = spells.slice(0,9).map( (spell, i) => {
        return <li key={i} onClick={e => handleClickSpell(e, i)}>{spell.name}</li>
    });

    const handleClickSpell = (event, id) => {
        event.preventDefault();
        setSelectedSpellId(id);
    }

    return(
        <aside id="spell-list-sidebar">
               <ol>
                    {spellLis}
               </ol>
        </aside>
    )

}

export default SpellList;