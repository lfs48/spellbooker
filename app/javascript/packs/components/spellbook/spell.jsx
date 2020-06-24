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
    )

}

export default Splash;