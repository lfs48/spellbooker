import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpellbook } from '../actions/entities/spell_actions';
import { closeModal } from '../actions/ui/modal_actions';
import { closeAllSpells } from '../actions/ui/selected_spell_actions';

const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [nameInput, setNameInput] = useState("");
    const [stage, setStage] = useState(1);

    useEffect( () => {
        dispatch( closeModal() );
        dispatch( closeAllSpells() );
    }, []);

    const handleSRD = (event) => {
        event.preventDefault();
        history.push("/spellbook/srd");
    }

    const handleNewSpellbook = (event) => {
        event.preventDefault();
        setStage(2);
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

    const handleBackButton = (event) => {
        event.preventDefault();
        setStage(1);
    }

    let content = <></>;
    switch (stage) {
        case 1:
            content = (
                <form id="splash-buttons-container">
                    <button onClick={e => handleSRD(e)}>View SRD Spells</button>
                    <button onClick={e => handleNewSpellbook(e)}>Create New Spellbook</button>
                </form>
            )
            break;

        case 2:
            content = (
                <form id="splash-input-container">
                    <input
                        type="text"
                        value={nameInput}
                        placeholder="Name"
                        onChange={e => updateNameInput(e)}
                    ></input>
                    <button onClick={e => handleCreateButton(e)}>Create</button>
                    <button onClick={e => handleBackButton(e)}>Back</button>

                </form>
            )
            break;
    }

    return(
        <section id="splash-container">
            <h1>Spellbooker 5e</h1>
            {content}
        </section>
    )

}

export default Splash;