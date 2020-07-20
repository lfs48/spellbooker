import React, { useState } from 'react';
import { dndSchoolList } from '../../data/dnd_data';
import {intToOrdinal} from '../../util/functions/util_functions';
import { merge } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';
import { openSpell } from '../../actions/ui/selected_spell_actions';

const SpellForm = () => {

    const dispatch = useDispatch();

    const {spellbook, spells, modal} = useSelector(
        state => ({
            spellbook: state.entities.spellbook,
            spells: state.entities.spells,
            modal: state.ui.modal
        })
    );

    let presetInputs;

    if (modal.data.id) {
        const spell = spells[modal.data.id];
        presetInputs = {
            id: spell.id,
            name: spell.name,
            level: spell.level,
            school: spell.school,
            classes: spell.classes.split(","),
            castingTime: spell.casting_time,
            range: spell.range,
            v: spell.components.includes("V") ? "true" : "false",
            s: spell.components.includes("S")  ? "true" : "false",
            m: spell.components.includes("M")  ? "true" : "false",
            material: spell.material,
            duration: spell.duration,
            concentration: spell.concentration ? "true" : "false",
            desc: spell.desc.join("\n\n"),
            higher_level: spell.higher_level ? spell.higher_level.join("\n\n") : ""
        }
    } else {
        presetInputs = {
            id: Object.keys(spells).length,
            name: "",
            level: 0,
            school: "abjuration",
            classes: [],
            castingTime: "",
            range: "",
            v: "false",
            s: "false",
            m: "false",
            material: "",
            duration: "",
            concentration: "false",
            desc: "",
            higher_level: ""
        }
    };

    const [inputs, setInputs] = useState(presetInputs);

    const [errors, setErrors] = useState({
        name: false,
        classes: false,
        castingTime: false,
        range: false,
        duration: false,
        desc: false
    });

    const classButtons = spellbook.classes.map( (dndclass, i) => {
        if (inputs.classes.includes(dndclass)) {
            return <button key={i} className="remove-class-button" onClick={e => removeClass(e, dndclass)}>{dndclass} ✓</button>
        } else {
            return <button key={i} className="add-class-button" onClick={e => addClass(e, dndclass)}>{dndclass}</button>
        }
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
                autoComplete="off"
            ></input>
        );
    }

    const handleInput = (event, field) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState[field] = event.target.value;
        setInputs(newState);
    }

    const addClass = (event, dndclass) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.classes.push(dndclass);
        setInputs(newState);
    }

    const removeClass = (event, dndclass) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.classes = newState.classes.filter( el => el != dndclass);
        setInputs(newState);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const spell = {
            id: inputs.id,
            name: inputs.name,
            level: parseInt(inputs.level),
            school: inputs.school,
            classes: inputs.classes.join(","),
            casting_time: inputs.castingTime,
            range: inputs.range,
            components: `${inputs.v === "true" ? "V" : ""}${inputs.s  === "true" ? "S" : ""}${inputs.m  === "true" ? "M" : ""}`.split("").join(","),
            material: inputs.material,
            duration: inputs.duration,
            concentration: inputs.concentration === "true",
            desc: inputs.desc.split('\n\n'),
            higher_level: inputs.higher_level.length > 0 ? inputs.higher_level.split('\n\n') : null
        };
        const newSpells = merge({}, spells);
        const newSpellbook = merge({}, spellbook);
        newSpells[spell.id] = spell;
        newSpellbook.spells = JSON.stringify(newSpells);
        if ( validateInput() ) { 
            dispatch(updateSpellbook(newSpellbook))
            .then( () => dispatch( closeModal() ) )
            .then( () => dispatch( openSpell(spell.id) ) ); 
        }
    }

    const validateInput = () => {
        let hasErrors = false;
        const newErrors = {
            name: false,
            classes: false,
            castingTime: false,
            range: false,
            duration: false,
            desc: false
        };
        const validatedInputs = ["name", "classes", "castingTime", "range", "duration", "desc"];
        validatedInputs.forEach( (input) => {
            if (inputs[input].length < 1) { 
                hasErrors = true;
                newErrors[input] = true;
            }
        });
        setErrors(newErrors);
        return !hasErrors;
    }

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const errorMessages = {
        name: "Spell must have a name",
        classes: "Spell must belong to at least one class",
        castingTime: "Spell must have a casting time",
        range: "Spell must have a range",
        duration: "Spell must have a duration",
        desc: "Your spell must do something"
    };

    const errorComponents = Object.entries(errors).map( ([key, val], i) => {
        return <span key={i} className={ val ? "spell-form-error-message" : "spell-form-error-hidden"} id={`spell-form-${key}-error`}>{errorMessages[key]}</span>
    });

    return(
        <form className="spell-form">
            {errorComponents}
            <input
                id="spell-form-name-input"
                className="spell-form-input"
                type="text"
                placeholder="Name"
                value={inputs.name}
                onChange={e => handleInput(e, 'name')}
                autoComplete="off"
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
            <section id="spell-form-classes-section">
                <div>
                    {classButtons}
                </div>
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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