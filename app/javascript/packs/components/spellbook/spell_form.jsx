import React, { useState } from 'react';
import { dndclassList, dndSchoolList } from '../../data/dnd_data';
import {intToOrdinal} from '../../util/functions/util_functions';
import { merge } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';

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
        castingTime: "",
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
        return <option key={i} value={level}>{intToOrdinal(level)}-level</option>
    });

    const schoolOptions = dndSchoolList.map( (school, i) => {
        return <option key={i} value={school}>{school}</option>
    });

    const vsmSelects = ['v', 's', 'm'].map( (el, i) => {
        return(
            <select 
                id={`spell-form-${el}-input`}
                className="spell-form-input"
                key={i} value={inputs[el]} 
                onChange={e => handleInput(e, el)}>
                <option value={false}>—</option>
                <option value={true}>{el}</option>
            </select>
        );
    });

    let materialInput = <></>;
    if (inputs.m === "true") {
        materialInput = (
            <input
                id="spell-form-material-input"
                className="spell-form-input"
                type="text"
                placeholder="Material Description"
                value={inputs.material}
                onChange={e => handleInput(e, 'material')}
            ></input>
        );
    }

    const handleInput = (event, field, arr) => {
        event.preventDefault();
        event.target.classes = event.target.classList.replace("spell-form-error", "spell-form-input");
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
            casting_time: inputs.castingTime,
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
        if ( validateInput() ) { dispatch(updateSpellbook(newSpellbook)); }
    }

    const validateInput = () => {
        let errors = false;
        const validatedInputs = ["name", "classes", "castingTime", "range", "duration", "desc"];
        validatedInputs.forEach( (input) => {
            if (inputs[input].length < 1) {
                $(`#spell-form-${input}-input`).addClass("spell-form-error"); 
                errors = true;
            }
        });
        return !errors;
    }

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    return(
        <form className="spell-form">
            <input
                id="spell-form-name-input"
                className="spell-form-input"
                type="text"
                placeholder="Name"
                value={inputs.name}
                onChange={e => handleInput(e, 'name')}
            ></input>
                <section id="level-school-section">
                    <select 
                        id="spell-form-level-input"
                        className="spell-form-input"
                        value={inputs.level} 
                        onChange={e => handleInput(e, 'level')}>
                        {levelOptions}
                    </select>
                    <select 
                        id="spell-form-school-input"
                        className="spell-form-input"
                        value={inputs.school} 
                        onChange={e => handleInput(e, 'school')}>
                        {schoolOptions}
                    </select>
            </section>
            <section>
                <select 
                    id="spell-form-classes-input"
                    className="spell-form-input"
                    multiple={true} 
                    value={inputs.classes} 
                    size={dndclassList.length}
                    onChange={e => handleInput(e, 'classes', true)}>
                    {classOptions}
                </select>
            </section>
            <section>
                <label htmlFor="spell-form-castingTime-input">Casting Time: </label>
                <input
                    id="spell-form-castingTime-input"
                    className="spell-form-input"
                    type="text"
                    placeholder="1 action"
                    value={inputs.castingTime}
                    onChange={e => handleInput(e, 'castingTime')}
                ></input>
            </section>
            <section>
                <label htmlFor="spell-form-range-input">Range: </label>
                <input
                    id="spell-form-range-input"
                    className="spell-form-input"
                    type="text"
                    placeholder="60 feet"
                    value={inputs.range}
                    onChange={e => handleInput(e, 'range')}
                ></input>
            </section>
             <section>
                <label>Components: </label>
                {vsmSelects}
                {materialInput}
            </section>
            <section>
                <label htmlFor="spell-form-duration-input">Duration: </label>
                <input
                    id="spell-form-duration-input"
                    type="text"
                    className="spell-form-input"
                    placeholder="Duration"
                    value={inputs.duration}
                    onChange={e => handleInput(e, 'duration')}
                ></input>
                <label htmlFor="spell-form-concentration-input">Concentration?</label>
                <select 
                    id="spell-form-concentration-input"
                    className="spell-form-input"
                    value={inputs.concentration} 
                    onChange={e => handleInput(e, "concentration")}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </section>
            <section id="spell-form-desc-section">
                <textarea
                    id="spell-form-desc-input"
                    className="spell-form-input"
                    placeholder="A bright streak flashes from your pointing finger to a point you choose within range..."
                    value={inputs.desc}
                    onChange={e => handleInput(e, 'desc')}
                ></textarea>
                <label>At Higher Levels.</label>
                <textarea
                    id="spell-form-higherLevel-input"
                    className="spell-form-input"
                    placeholder="When you cast this spell using a spell slot of 4th level or higher..."
                    value={inputs.higher_level}
                    onChange={e => handleInput(e, 'higher_level')}
                ></textarea>
            </section>
            <section id="spell-form-button-section">
                <button onClick={e => handleCancel(e)}>Cancel</button>
                <button onClick={e => handleSubmit(e)}>Submit</button>
            </section>
        </form>
    );
};

export default SpellForm;