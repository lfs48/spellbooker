import React from 'react';
import { useHistory } from 'react-router-dom';

const About = () => {

    const history = useHistory();

    return(
        <section id="about-container">
            <article id="about-scroll">
                <section id="about-text-container">
                    <h1>About Spellbooker</h1>
                    <p>{"Spellbooker is a website designed to help D&D players track and manage the game's long and complex selection of spells."}</p>
                    <b>Browse Spells.</b>
                    <p>View a complete list of the 5th Edition SRD's 318 spells. These can be filtered by class, spell level, and spell school, and can be searched for by name or description. Note spells outside the publically available SRD cannot be included for legal reasons.</p>
                    <b>Spell Panels.</b>
                    <p>Selecting spells from the spell list will open up panels displaying information about that spell. These panels can be dragged and resized, allowing you to have the spells you want handy for viewing during a session.</p>
                    <b>Custom Spellbooks.</b>
                    <p>Besides browsing the default SRD spell list, you can also make your own spellbook. In your custom spellbook, you can edit existing spells and create news ones, providing your group with an easy reference for homebrew content.</p>
                    <button onClick={e => (history.goBack())}>
                        Back
                    </button>
                </section>
            </article>
        </section>
    )
};

export default About;