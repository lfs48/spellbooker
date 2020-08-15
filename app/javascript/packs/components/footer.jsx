import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return(
        <footer id="app-footer">
            <FontAwesomeIcon id="splash-info-button" icon={faQuestionCircle} />
        </footer>
    );
};

export default Footer;