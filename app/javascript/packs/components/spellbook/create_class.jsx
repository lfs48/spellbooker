import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {merge} from 'lodash';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';

const CreateClass = () => {

    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        spells: []
    });
    const [errors, setErrors] = useState([]);

    const {spellbook, spells} = useSelector(
        state => ({
            spellbook: state.entities.spellbook,
            spells: state.entities.spells
        })
    );

    const handleInput = (event, field, isArr) => {
        event.preventDefault();
        const newState = merge({}, inputs);

        if (isArr) {
            if (newState[field].includes(event.target.value)) {
                newState[field] = newState[field].filter(el => el != event.target.value);
            } else {
                newState[field].push(event.target.value);
            }

        } else {
            newState[field] = event.target.value;
        }

        setInputs(newState);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newClass = inputs.name.toLowerCase();
        const newSpells = merge({}, spells);
        inputs.spells.forEach( id => {
            const classList = newSpells[id].classes.split(",");
            classList.push(newClass);
            newSpells[id].classes = classList.sort().join(",");
        });
        const newSpellbook = merge({}, spellbook);
        newSpellbook.classes.push(newClass);
        newSpellbook.classes = newSpellbook.classes.sort().join(",");
        newSpellbook.spells = JSON.stringify(newSpells);
        if (validateInputs()) {
            dispatch( updateSpellbook(newSpellbook) )
            .then( () => dispatch(closeModal()) );
        }
    }

    const validateInputs = () => {
        const errors = [];
        if (inputs.name.length <= 0) {
            errors.push("Class must have a name");
        }
        if (inputs.name.length > 20) {
            errors.push("Class name too long");
        }
        if ( spellbook.classes.some( dndclass => dndclass.toLowerCase() === inputs.name.toLocaleLowerCase() ) ) {
            errors.push("That class already exists");
        }
        setErrors(errors);
        return errors.length === 0;
    }

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    let colorClass = false;

    const spellOptions = Object.values(spells).map( (spell) => {
        colorClass = !colorClass
        return <option key={spell.id} value={spell.id}>{spell.name}</option>
    });

    const errorLis = errors.map( (error, i) => {
        return <li key={i}>{error}</li>
    });

    return(
        <form className="modal-form" id="create-class">
            <ul className={errors.length > 0 ? `error-list` : `error-list-hidden`}>
                {errorLis}
            </ul>
            <h1>Create Class</h1>
            <section id="create-class-input-section">
                <input
                    type="text"
                    placeholder="Name"
                    value={inputs.name}
                    onChange={e => handleInput(e, 'name')}
                    maxLength={20}
                ></input>
                <i>Optional: Choose spells for new class</i>
                <select 
                    multiple={true}
                    value={inputs.spells}
                    onChange={e => handleInput(e, 'spells', true)}
                >
                    {spellOptions}
                </select>
            </section>
            <section>
                <button onClick={e => handleCancel(e)}>Cancel</button>
                <button onClick={e => handleSubmit(e)}>Submit</button>
            </section>
        </form>
    )
};

export default CreateClass;