import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpellbook} from '../actions/spell_actions'; 

const Splash = () => {

    const dispatch = useDispatch();

    const [selectedSpell, setSelectedSpell] = useState(0);

    useEffect( () => {
        dispatch(fetchSpellbook({url: "srd"}))
    }, []);

    const {spells} = useSelector(
        state => ({
            spells: Object.values(state.spells)
        })
    );

    let spell_lis = <></>;
    spell_lis = spells.slice(0,9).map( (spell, i) => {
        return <li key={i} onClick={e => handleClickSpell(e, i)}>{spell.name}</li>
    });

    const handleClickSpell = (event, id) => {
        event.preventDefault();
        setSelectedSpell(id);
    }

    return(
        <section id="spellbook-container">
           <aside id="spell-list-sidebar">
               <ul>
                    {spell_lis}
               </ul>
           </aside>
           <section id="spell-section-right">
               <header id="spell-filters-bar">placeholder text</header>
                <article id="selected-spell-info">{spells[selectedSpell] ? spells[selectedSpell].name : ""}</article>
           </section>
        </section>
    )

}

export default Splash;