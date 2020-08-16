import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faPatreon} from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

const Footer = () => {

    const history = useHistory();

    const handleGithub = (event) => {
        event.preventDefault();
        window.location = "https://github.com/lfs48/spellbooker";
    }

    return(
        <footer id="app-footer">
            <section>
                <FontAwesomeIcon id="splash-contact-button" icon={faEnvelope} />
                <label>Contact</label>
            </section>
            <section>
                <FontAwesomeIcon id="splash-patreon-button" icon={faPatreon} />
                <label>Patreon</label>
            </section>
            <section>
                <FontAwesomeIcon id="splash-github-button" onClick={e => handleGithub(e)} icon={faGithub} />
                <label>Github</label>
            </section>
            <section>
                <FontAwesomeIcon id="splash-info-button" icon={faQuestionCircle} />
                <label>About</label>
            </section>
        </footer>
    );
};

export default Footer;