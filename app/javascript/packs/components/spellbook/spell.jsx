import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {intToOrdinal} from '../../util/functions/util_functions'
import {dndclassList} from '../../data/dnd_data';
import { selectSpell } from '../../actions/ui/selected_spell_actions';

const Spell = () => {

    const dispatch = useDispatch();

    const [selectedSpellId, setSelectedSpellId] = useState(0);
    const [show, setShow] = useState(true);

    const {selectedSpell} = useSelector(
        state => ({
            selectedSpell: state.entities.spells[state.ui.selectedSpell] ? state.entities.spells[state.ui.selectedSpell] : {name:"", range: "", level: "", components:"", material:"", ritual: false, concentration: false, duration: "", casting_time: "", school: "", classes: "", desc: [], higher_level_desc: [], notes: ""}
        })
    );

    const handleDoubleClick = (event) => {
        event.preventDefault();
        setShow(!show);
    }
    
    return(
        <article className={show ? "open-spell" : "hidden-spell"} onDoubleClick={e => handleDoubleClick(e)} id="selected-spell-info">
            <h1>{selectedSpell.name}</h1>

            <section id="spell-details">
                <span>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school} {selectedSpell.ritual? "(ritual)" : ""}</span>
                <dl>
                    <dt>Classes</dt>
                    <dd>: {selectedSpell.classes.split(",").join(", ")}</dd>
                </dl>
                <dl>
                    <dt>Casting Time</dt>
                    <dd>: {selectedSpell.casting_time}</dd>
                </dl>
                <dl>
                    <dt>Range</dt>
                    <dd>: {selectedSpell.range}</dd>
                </dl>
                <dl>
                    <dt>Components</dt>
                    <dd>: {selectedSpell.components} {selectedSpell.material ? `(${selectedSpell.material})` : ""}</dd>
                </dl>
                <dl>
                    <dt>Duration</dt>
                    <dd>:{selectedSpell.duration} {selectedSpell.concentration ? "(concentration)" : ""}</dd>
                </dl>

            </section>

            <section id="spell-desc">
                <p>{selectedSpell.desc.join("\n\n")}</p>
                <p>{selectedSpell.higher_level_desc ? `At Higher Levels: ${selectedSpell.higher_level_desc.join("\n")}` : ""} </p>
            </section>
        </article>
    )

}

export default Spell;