import React, { useState } from 'react';
import {merge} from 'lodash';

const CreateClass = () => {

    const [inputs, setInputs] = useState({
        name: "",
        spells: ""
    });

    const handleInput = (event, field) => {
        event.preventDefault();
        newState = merge({}, inputs);
        newState[field] = event.target.value;
        setInputs(newState);
    }

    return(
        <form>
            <input
                type="text"
                placeholder="Name"
                value={inputs.name}
                onChange={e => handleInput(e, 'name')}
            ></input>
            <label>Optional: Seed class spell list with a comma separated list of spell names</label>
            <textarea
                type="text"
                placeholder="Acid Arrow, Aid, Animate Objects, Awaken, ..."
                value={inputs.spells}
                onChange={e => handleInput(e, 'spells')}
            ></textarea>
        </form>
    )
};

export default CreateClass;