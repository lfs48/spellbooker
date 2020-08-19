import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {capitalize, merge} from 'lodash';
import { updateSpellbook } from '../../actions/entities/spell_actions';
import { closeModal } from '../../actions/ui/modal_actions';
import { useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const ManageClasses = () => {

    const dispatch = useDispatch();
    const location = useLocation().pathname;
    const edit_url = location.slice( location.indexOf("edit/") + 5 );

    const {spellbook, spells} = useSelector(
        state => ({
            spellbook: state.entities.spellbook,
            spells: state.entities.spells
        })
    );

    const [classesState, setClasses] = useState({});

    useEffect( () => {
        const newState = {};
        spellbook.classes.forEach( dndclass => {
            newState[dndclass] = {
                editedName: dndclass,
                deleted: false,
                editing: false
            }
        });
        setClasses(newState);
    }, []);

    const classButtons = spellbook.classes.map( (dndclass, i) => {
        if (dndclass in classesState) {
            const editedClass = classesState[dndclass].editedName;
            return (
                <li key={i} className={`manage-classes-li-${classesState[dndclass].deleted ? `inactive` : `active`}`}>
                    {classesState[dndclass].editing ?
                        <>
                        <input
                            type="text"
                            value={classesState[dndclass].editedName}
                            onChange={e => handleInput(e, dndclass)}
                        >
                        </input>
                        <section>
                            <FontAwesomeIcon onClick={e => handleSubmitEdit(e, dndclass)} icon={faCheck}></FontAwesomeIcon>
                            <FontAwesomeIcon onClick={e => handleDeleteButton(e, dndclass)} icon={faTimes}></FontAwesomeIcon>
                        </section>
                        </>
                        :
                        <>
                        <label>{capitalize(editedClass)}</label>
                        <section>
                            <FontAwesomeIcon onClick={e => handleEditButton(e, dndclass)} icon={faPen}></FontAwesomeIcon>
                            <FontAwesomeIcon onClick={e => handleDeleteButton(e, dndclass)} icon={faTrash}></FontAwesomeIcon>
                        </section>
                        </>
                    }
                </li>
            );
        } else {
            return <li key={i}></li>;
        }
    });

    const handleCloseButton = (event) => {
        event.preventDefault();
        dispatch( closeModal() );
    }

    const handleSaveButton = (event) => {
        event.preventDefault();
        const newBook = {};
        newBook.url = edit_url;

        const newClasses = [];
        Object.values(classesState).forEach( (val) => {
            if (!val.deleted) {
                newClasses.push(val.editedName);
            }
        });
        newBook.classes = newClasses.join(",");

        const newSpells = {};
        Object.values(spells).forEach( (spell) => {
            const newSpell = merge({}, spell);
            const oldSpellClasses = spell.classes.length > 0 ? spell.classes.split(",") : [];
            let newSpellClasses = oldSpellClasses
            .filter( oldClass => !classesState[oldClass].deleted )
            .map( oldClass => classesState[oldClass].editedName );
            newSpell.classes = newSpellClasses.join(",");
            newSpells[spell.id] = newSpell;
        });
        newBook.spells = JSON.stringify(newSpells);

        dispatch( updateSpellbook(newBook) )
        .then( dispatch( closeModal() ) );
    }

    const handleDeleteButton = (event, field) => {
        event.preventDefault();
        const newState = merge({}, classesState);
        newState[field].deleted = true;
        setClasses(newState);
    }

    const handleEditButton = (event, field) => {
        event.preventDefault();
        const newState = merge({}, classesState);
        newState[field].editing = true;
        setClasses(newState);
    }

    const handleInput = (event, field) => {
        event.preventDefault();
        const newState = merge({}, classesState);
        newState[field].editedName = event.target.value;
        setClasses(newState);
    }

    const handleSubmitEdit = (event, field) => {
        event.preventDefault();
        const newState = merge({}, classesState);
        newState[field].editing = false;
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