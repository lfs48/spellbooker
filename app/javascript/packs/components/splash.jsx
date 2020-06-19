import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpellbook} from '../actions/entities/spell_actions'; 
import {intToOrdinal} from '../util/functions/util_functions'
import {dndclassList} from '../data/dndclasses';

const Splash = () => {

    const dispatch = useDispatch();

    const [selectedSpellId, setSelectedSpellId] = useState(0);
    const [selectedClass, setSelectedClass] = useState("all")

    useEffect( () => {
        dispatch(fetchSpellbook({url: "srd"}))
    }, []);

    const {spells} = useSelector(
        state => ({
            spells: Object.values(state.entities.spells)
        })
    );

    let spellLis = <></>;
    const filteredSpells = spells.filter( (spell) => {
        if (selectedClass === 'all') {return true};
        return spell.classes.split(",").includes(selectedClass);
    });
    spellLis = filteredSpells.slice(0,9).map( (spell, i) => {
        return <li key={i} onClick={e => handleClickSpell(e, i)}>{spell.name}</li>
    });

    const handleClickSpell = (event, id) => {
        event.preventDefault();
        setSelectedSpellId(id);
    }
    const selectedSpell = spells[selectedSpellId] ? spells[selectedSpellId] : {name:"", range: "", level: "", components:"", material_desc:"", ritual: false, conc: false, duration: "", cast_time: "", school: "", classes: "", desc: "[]", higher_level_desc: "", notes: ""}

    const classOptions = dndclassList.map( (dndclass, i) => {
        return <option key={i} value={dndclass}>{dndclass}</option>
    });

    const handleClassSelect = (event) => {
        event.preventDefault();
        setSelectedClass(event.target.value);
    }

    return(
        <section id="spellbook-container">
           <aside id="spell-list-sidebar">
               <ul>
                    {spellLis}
               </ul>
           </aside>
           <section id="spell-section-right">
               <header id="spell-filters-bar">
                   <label>Class</label>
                   <select onChange={e => handleClassSelect(e)}>
                       <option value="all">all</option>
                       {classOptions}
                   </select>
               </header>
                <article id="selected-spell-info">
                    <h1>{selectedSpell.name}</h1>
                    <span>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school}</span>
                    <br></br>
                    <span>Casting Time: {selectedSpell.cast_time}</span>
                    <br></br>
                    <span>Range: {selectedSpell.range}</span>
                    <br></br>
                    <span>Components: {selectedSpell.components}</span>
                    <br></br>
                    <span>Duration: {selectedSpell.duration}</span>
                    <blockquote>
                        {JSON.parse(selectedSpell.desc).join("\n")}
                        <br></br>
                        {selectedSpell.higher_level_desc ? `At Higher Levels: ${JSON.parse(selectedSpell.higher_level_desc).join("\n")}` : ""}
                    </blockquote>
                </article>
           </section>
        </section>
    )

}

export default Splash;