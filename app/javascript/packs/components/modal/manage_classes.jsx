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

    const classButtons = spellbook.classes.map( (dndclass, i) => {
        return (
            <li key={i}>
                <label>{capitalize(dndclass)}</label>
                <section>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </section>
            </li>
        );
    });

    return(
        <form className="modal-form" id="manage-classes">
            <ol>
                {classButtons}
            </ol>
        </form>
    )
};

export default ManageClasses;