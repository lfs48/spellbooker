import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {intToOrdinal} from '../../util/functions/util_functions'
import {dndclassList} from '../../data/dnd_data';

const Splash = () => {

    const dispatch = useDispatch();

    const [selectedSpellId, setSelectedSpellId] = useState(0);

    const {selectedSpell} = useSelector(
        state => ({
            selectedSpell: state.entities.spells[state.ui.selectedSpell] ? state.entities.spells[state.ui.selectedSpell] : {name:"", range: "", level: "", components:"", material_desc:"", ritual: false, conc: false, duration: "", cast_time: "", school: "", classes: "", desc: "[]", higher_level_desc: "", notes: ""}
        })
    );
    
    return(
        <article id="selected-spell-info">
            <h1>{selectedSpell.name}</h1>

            <section id="spell-details">
                <span>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school}</span>
                <dl>
                    <dt>Range</dt>
                    <dd>: {selectedSpell.range}</dd>
                </dl>
                <dl>
                    <dt>Components</dt>
                    <dd>: {selectedSpell.components}</dd>
                </dl>
                <dl>
                    <dt>Duration</dt>
                    <dd>: {selectedSpell.duration}</dd>
                </dl>

            </section>

            <section id="spell-desc">
                <p>{JSON.parse(selectedSpell.desc).join("\n\n")}</p>
                <p>{selectedSpell.higher_level_desc ? `At Higher Levels: ${JSON.parse(selectedSpell.higher_level_desc).join("\n")}` : ""} </p>
            </section>
        </article>
    )

}

export default Splash;