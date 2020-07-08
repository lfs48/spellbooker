import React, { useState } from 'react';
import { dndclassList, dndSchoolList } from '../../data/dnd_data';
import {intToOrdinal} from '../../util/functions/util_functions';
import { merge } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpellbook } from '../../actions/entities/spell_actions';

const SpellForm = () => {

    const dispatch = useDispatch();

    const {spellbook, spells} = useSelector(
        state => ({
            spellbook: state.entities.spellbook,
            spells: state.entities.spells
        })
    );

    const [inputs, setInputs] = useState({
        name: "",
        level: "0",
        school: "abjuration",
        classes: [],
        casting_time: "",
        range: "",
        v: false,
        s: false,
        m: false,
        material: "",
        duration: "",
        concentration: "false",
        desc: "",
        higher_level: ""

    });

    const classOptions = dndclassList.map( (dndclass, i) => {
        return <option key={i} value={dndclass}>{dndclass}</option>
    });

    const levelOptions = [...Array(10).keys()].map( (level, i) => {
        return <option key={i} value={level}>{intToOrdinal(level)}</option>
    });

    const schoolOptions = dndSchoolList.map( (school, i) => {
        return <option key={i} value={school}>{school}</option>
    });

    const vsmSelects = ['v', 's', 'm'].map( (el, i) => {
        return(
            <select key={i} value={inputs[el]} onChange={e => handleInput(e, el)}>
                <option value={false}>—</option>
                <option value={true}>{el}</option>
            </select>
        );
    });

    let materialInput = <></>;
    if (inputs.m === "true") {
        materialInput = (
            <input
            type="text"
            placeholder="Material Description"
            value={inputs.material}
            onChange={e => handleInput(e, 'material')}
            ></input>
        );
    }

    const handleInput = (event, field, arr) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        if (arr) {
            if ( newState.classes.includes(event.target.value) ) {
                newState[field] = newState[field].filter(el => el != event.target.value);
            } else {
                newState[field].push(event.target.value);
            }
        } else {
            newState[field] = event.target.value;
        }

        setInputs(newState);
    }

    const handleButton = (event) => {
        event.preventDefault();
        console.log(inputs);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const spell = {
            id: Object.keys(spells).length,
            name: inputs.name,
            level: inputs.level,
            school: inputs.school,
            classes: inputs.classes.join(","),
            casting_time: inputs.casting_time,
            range: inputs.range,
            components: `${inputs.v ? "V" : ""}${inputs.s ? "S" : ""}${inputs.m ? "M" : ""}`.split("").join(","),
            material: inputs.material,
            duration: inputs.duration,
            concentration: inputs.concentration === "true",
            desc: inputs.desc.split('\n'),
            higher_level: inputs.higher_level.split('\n')
        };
        const newSpells = merge({}, spells);
        const newSpellbook = merge({}, spellbook);
        newSpells[spell.id] = spell;
        newSpellbook.spells = JSON.stringify(newSpells);
        dispatch(updateSpellbook(newSpellbook));
    }

    return(
        <form className="spell-form">
            <input
                type="text"
                placeholder="Name"
                value={inputs.name}
                onChange={e => handleInput(e, 'name')}
            ></input>
            <select value={inputs.level} onChange={e => handleInput(e, 'level')}>
                {levelOptions}
            </select>
            <select value={inputs.school} onChange={e => handleInput(e, 'school')}>
                {schoolOptions}
            </select>
            <select multiple={true} value={inputs.classes} onChange={e => handleInput(e, 'classes', true)}>
                {classOptions}
            </select>
            <input
                type="text"
                placeholder="Castine Time"
                value={inputs.casting_time}
                onChange={e => handleInput(e, 'casting_time')}
            ></input>
            <input
                type="text"
                placeholder="Range"
                value={inputs.range}
                onChange={e => handleInput(e, 'range')}
            ></input>
            {vsmSelects}
            {materialInput}
            <input
                type="text"
                placeholder="Duration"
                value={inputs.duration}
                onChange={e => handleInput(e, 'duration')}
            ></input>
            <label>Concentration?</label>
            <select value={inputs.concentration} onChange={e => handleInput(e, "concentration")}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
            <textarea
                type="text"
                placeholder="A bright streak flashes from your pointing finger to a point you choose within range..."
                value={inputs.desc}
                onChange={e => handleInput(e, 'desc')}
            ></textarea>
            <textarea
                type="text"
                placeholder="When you cast this spell using a spell slot of 4th level or higher..."
                value={inputs.higher_level}
                onChange={e => handleInput(e, 'higher_level')}
            ></textarea>
            <button onClick={e => handleButton(e)}>debug</button>
            <button onClick={e => handleSubmit(e)}>Submit</button>
        </form>
    );
};

export default SpellForm;