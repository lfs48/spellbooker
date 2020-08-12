import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui/modal_actions';

const Share = () => {

    const dispatch = useDispatch();

    const {url} = useSelector(
        state => ({
            url: state.entities.spellbook.url
        })
    );

    const handleClose = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleCopy = (event) => {
        event.preventDefault();
        const copyText = document.getElementById("share-url");
        copyText.select();
        document.execCommand('copy');
    }

    return(
        <section id="spellbook-share" className="modal-form">
            <h1>Use the following url to share this spellbook</h1>
            <input
                id="share-url"
                type="text"
                onChange={e => e.preventDefault()}
                value={`http://spellbooker.com/#/spellbook/view/${url}`}
            ></input>
            <section>
                <button onClick={e => handleClose(e)}>Close</button>
                <button onClick={e => handleCopy(e)}>Copy</button>
            </section>
        </section>
    );
}

export default Share;