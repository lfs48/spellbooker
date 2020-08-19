import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {capitalize, merge} from 'lodash';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';
import { useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

const ManageClasses = () => {

    const dispatch = useDispatch();
    const location = useLocation().pathname;
    const edit_url = location.slice( location.indexOf("edit/") + 5 );

    const {spellbook} = useSelector(
        state => ({
            spellbook: state.entities.spellbook
        })
    );

    const [classes, setClasses] = useState(spellbook.classes);

    const classButtons = classes.map( (dndclass, i) => {
        return (
            <li key={i}>
                <label>{capitalize(dndclass)}</label>
                <section>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    <FontAwesomeIcon onClick={e => handleDeleteButton(e, dndclass)} icon={faTrash}></FontAwesomeIcon>
                </section>
            </li>
        );
    });

    const handleCloseButton = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleSaveButton = (event) => {
        event.preventDefault();
        const newBook = {};
        newBook.url = edit_url;
        newBook.classes = classes.join(",");
        dispatch( updateSpellbook(newBook) )
        .then( dispatch( closeModal() ) );
    }

    const handleDeleteButton = (event, field) => {
        event.preventDefault();
        const newState = classes.filter( el => el.toLowerCase() != field.toLowerCase() );
        setClasses(newState);
    }

    return(
        <form className="modal-form" id="manage-classes">
            <ol>
                {classButtons}
            </ol>
            <section>
                <button onClick={e => handleCloseButton(e)}>Close</button>
                <button onClick={e => handleSaveButton(e)}>Save</button>
            </section>
        </form>
    )
};

export default ManageClasses;