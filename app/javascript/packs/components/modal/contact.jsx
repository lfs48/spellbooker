import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/ui/modal_actions';

const Contact = () => {

    const dispatch = useDispatch();

    const contactOptions = ["Report Issue", "Suggest Feature", "Feedback", "Other"].map( (el, i) => {
        return <option key={i} value={el}>{el}</option>
    })

    const handleClose = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <form id="contact-form" className="modal-form">
            <h1>Contact</h1>
            <section>
                <label>Subject</label>
                <select>
                    {contactOptions}
                </select>
            </section>
            <textarea
                placeholder="Write a message here"
            ></textarea>
            <section>
                <button onClick={e => handleClose(e)}>Cancel</button>
                <button onClick={e => handleSubmit(e)}>Submit</button>
            </section>
        </form>
    );
}

export default Contact;