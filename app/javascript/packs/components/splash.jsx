import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpellbook } from '../actions/entities/spell_actions';

const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();

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

    return(
        <section id="splash-container">
            <button onClick={e => handleSRD(e)}>View SRD Spells</button>
            <button onClick={e => handleNewSpellbook(e)}>Create New Spellbook</button>
        </section>
    )

}

export default Splash;