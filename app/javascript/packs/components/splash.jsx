import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpellbook } from '../actions/entities/spell_actions';
import { closeModal } from '../actions/ui/modal_actions';
import { closeAllSpells } from '../actions/ui/selected_spell_actions';
import { useCookies } from 'react-cookie';
import {merge} from 'lodash';

const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["spellbook"]);

    const [nameInput, setNameInput] = useState("");
    const [stage, setStage] = useState(1);

    useEffect( () => {
        dispatch( closeModal() );
        dispatch( closeAllSpells() );
        if( "spellbook" in cookies && "url" in cookies.spellbook) {
            setStage(3);
        }
    }, []);

    const handleSRD = (event) => {
        event.preventDefault();
        history.push("/spellbook/view/srd");
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
        .then( res => {
            const newCookies = merge({}, cookies.spellbook);
            newCookies["url"] = res.spellbook.edit_url;
            newCookies["name"] = res.spellbook.name;
            debugger
            setCookie("spellbook", newCookies);
            history.push(`/spellbook/edit/${res.spellbook.edit_url}`)
        });
    }

    const handleOpenSpellbook = (event) => {
        event.preventDefault();
        history.push(`/spellbook/edit/${cookies.spellbook.url}`);
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
        case 3:
            content = (
                <form id="splash-buttons-container">
                    <button onClick={e => handleSRD(e)}>View SRD Spells</button>
                    <button onClick={e => handleOpenSpellbook(e)}>{cookies.spellbook.name}</button>
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