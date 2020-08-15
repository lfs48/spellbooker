import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faPatreon} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
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
                <FontAwesomeIcon id="splash-github-button" icon={faGithub} />
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