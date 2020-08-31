import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpellbook, fetchSpellbook } from '../actions/entities/spell_actions';
import { closeModal, openModal } from '../actions/ui/modal_actions';
import { closeAllSpells } from '../actions/ui/selected_spell_actions';
import { useCookies } from 'react-cookie';
import {merge} from 'lodash';
import logo from '../../../assets/images/logo.png';

const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["spellbook"]);

    useEffect( () => {
        dispatch( closeModal() );
        dispatch( closeAllSpells() );
    }, []);

    const handleSRD = (event) => {
        event.preventDefault();
        history.push("/spellbook/view/srd");
    }

    const handleOpenSpellbook = (event) => {
        event.preventDefault();
        if ("spellbook" in cookies && "url" in cookies.spellbook) {
            dispatch( fetchSpellbook({url: cookies.spellbook.url}) )
            .then( (res) => {
                history.push(`/spellbook/edit/${cookies.spellbook.url}`);
            }, (rej) => {
                removeCookie("spellbook");
                dispatch( openModal("SplashErrors") );
            });
        } else {
            const newBook = {name: "My Spellbook"};
            dispatch( createSpellbook(newBook) )
            .then( res => {
                const newCookies = merge({}, cookies.spellbook);
                newCookies["url"] = res.spellbook.edit_url;
                newCookies["name"] = res.spellbook.name;
                setCookie("spellbook", newCookies);
                history.push(`/spellbook/edit/${res.spellbook.edit_url}`);
            });
        }
    }

    return(
        <section id="splash-container">
            <h1>Spellbooker 5e</h1>
            <img className="logo" id="splash-logo" />
            <form id="splash-buttons-container">
                <button onClick={e => handleSRD(e)}>View SRD Spells</button>
                <button onClick={e => handleOpenSpellbook(e)}>{"spellbook" in cookies && "name" in cookies.spellbook ? cookies.spellbook.name : "My Spellbook"}</button>
            </form>
        </section>
    )

}

export default Splash;