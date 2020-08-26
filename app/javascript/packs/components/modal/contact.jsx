import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/ui/modal_actions';
import {merge} from 'lodash';
import { createMessage } from '../../util/api/messages_api_util';

const Contact = () => {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        subject: "Report Issue",
        body: ""
    });

    const contactOptions = ["Report Issue", "Suggest Feature", "Feedback", "Other"].map( (el, i) => {
        return <option key={i} value={el}>{el}</option>
    })

    const handleClose = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createMessage( inputs );
        dispatch( closeModal() );
    }

    const handleInput = (event, field) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState[field] = event.target.value;
        setInputs(newState);
    }

    return(
        <form id="contact-form" className="modal-form">
            <h1>Contact</h1>
            <section>
                <label>Subject</label>
                <select
                    value={inputs.subject}
                    onChange={e => handleInput(e, 'subject')}
                >
                    {contactOptions}
                </select>
            </section>
            <textarea
                value={inputs.body}
                onChange={e => handleInput(e, 'body')}
                placeholder="Write a message here"
                maxLength={1000}
            ></textarea>
            <section>
                <button onClick={e => handleClose(e)}>Cancel</button>
                <button onClick={e => handleSubmit(e)}>Submit</button>
            </section>
        </form>
    );
}

export default Contact;