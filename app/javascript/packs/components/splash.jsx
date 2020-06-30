import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpellbook } from '../actions/entities/spell_actions';

const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [nameInput, setNameInput] = useState("");

    const handleSRD = (event) => {
        event.preventDefault();
        history.push("/spellbook/srd");
    }

    const handleNewSpellbook = (event) => {
        event.preventDefault();
        const spellbook = {
            name: "blah",
            desc: "blah"
        };
        dispatch( createSpellbook(spellbook) )
        .then( res => history.push(`/spellbook/${res.spellbook.url}`) );
    }

    const updateNameInput = (event) => {
        event.preventDefault();
        setNameInput(event.target.value);
    }

    const handleCreateButton = (event) => {
        event.preventDefault();
        const spellbook = { name: nameInput };
        dispatch( createSpellbook(spellbook) )
        .then( res => history.push(`/spellbook/${res.spellbook.url}`) );
    }

    return(
        <section id="splash-container">
            <button onClick={e => handleSRD(e)}>View SRD Spells</button>
            <button onClick={e => handleNewSpellbook(e)}>Create New Spellbook</button>
            <form>
                <input
                    type="text"
                    value={nameInput}
                    placeholder="Name"
                    onChange={e => updateNameInput(e)}
                ></input>
                <button onClick={e => handleCreateButton(e)}>Create</button>
            </form>
        </section>
    )

}

export default Splash;