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
            newState[field].push(event.target.value);
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
        dispatch( updateSpellbook(newSpellbook) )
        .then( () => dispatch(closeModal()) );
        ;
    }

    const spellOptions = Object.values(spells).map( (spell) => {
        return <option key={spell.id} value={spell.id}>{spell.name}</option>
    });

    return(
        <form>
            <input
                type="text"
                placeholder="Name"
                value={inputs.name}
                onChange={e => handleInput(e, 'name')}
            ></input>
            <label>Optional: Seed spell list for new class</label>
            <select 
                multiple={true}
                value={inputs.spells}
                onChange={e => handleInput(e, 'spells', true)}
            >
                {spellOptions}
            </select>
            <button onClick={e => handleSubmit(e)}>Submit</button>
        </form>
    )
};

export default CreateClass;