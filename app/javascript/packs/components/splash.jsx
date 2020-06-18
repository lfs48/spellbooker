import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpellbook} from '../actions/spell_actions'; 

const Splash = () => {

    const dispatch = useDispatch();

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
        debugger
        return <li key={i}>{spell.name}</li>
    });

    return(
        <section id="spellbook-container">
           <aside id="spell-list-sidebar">
               <ul>
                    {spell_lis}
               </ul>
           </aside>
           <section id="spell-section-right">
               <header id="spell-filters-bar">placeholder text</header>
               <article id="selected-spell-info">placeholder text</article>
           </section>
        </section>
    )

}

export default Splash;