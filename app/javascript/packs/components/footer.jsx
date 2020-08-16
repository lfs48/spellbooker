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

    const handleAboutButton = (event) => {
        event.preventDefault();
        history.push("/about");
    }

    return(
        <footer id="app-footer">
            <section>
                <FontAwesomeIcon id="footer-contact-button" icon={faEnvelope} />
                <label>Contact</label>
            </section>
            <section>
                <FontAwesomeIcon id="footer-patreon-button" icon={faPatreon} />
                <label>Patreon</label>
            </section>
            <section>
                <FontAwesomeIcon id="footer-github-button" onClick={e => handleGithub(e)} icon={faGithub} />
                <label>Github</label>
            </section>
            <section>
                <FontAwesomeIcon id="footer-about-button" onClick={e => handleAboutButton(e)} icon={faQuestionCircle} />
                <label>About</label>
            </section>
        </footer>
    );
};

export default Footer;