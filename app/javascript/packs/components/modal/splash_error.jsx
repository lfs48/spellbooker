import React from 'react';
import { useHistory } from 'react-router-dom';

const SplashError = () => {

    const history = useHistory();

    const handleClose = (event) => {
        event.preventDefault();
        history.go(0);
    }

    return(
        <section id="spellbook-share" className="modal-form">
            <h1>Unfortunately, your spellbook has been lost in the astral plane.</h1>
            <button onClick={e => handleClose(e)}>OK</button>
        </section>
    );
}

export default SplashError;