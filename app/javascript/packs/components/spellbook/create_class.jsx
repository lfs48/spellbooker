import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {merge} from 'lodash';

const CreateClass = () => {

    const [inputs, setInputs] = useState({
        name: "",
        spells: []
    });

    const {spells} = useSelector(
        state => ({
            spells: Object.values(state.entities.spells)
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

    const spellOptions = spells.map( (spell) => {
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
        </form>
    )
};

export default CreateClass;