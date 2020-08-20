import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {merge} from 'lodash';
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
                prevName: dndclass,
                deleted: false,
                editing: false
            }
        });
        setClasses(newState);
    }, []);

    let first; 
    for (let i = 0; i < spellbook.classes.length; i++) {
        const dndclass = spellbook.classes[i];
        if ( dndclass in classesState && !classesState[dndclass].deleted) {
            first = i;
            break;
        }
    }

    let last; 
    for (let i = spellbook.classes.length; i >= 0; i--) {
        const dndclass = spellbook.classes[i];
        if ( dndclass in classesState && !classesState[dndclass].deleted) {
            last = i;
            break;
        }
    }

    let light = false;
    let colors = spellbook.classes.map( (dndclass) => {
        if ( dndclass in classesState && !classesState[dndclass].deleted) {
            light = !light;
            return light ? "white-li" : "dark-li";
        } else {
            return light ? "dark-li" : "white-li";
        }
    });

    const classButtons = spellbook.classes.map( (dndclass, i) => {
        let posClass = "";
        if (i === first) {
            posClass = "first";
        } else if (i === last) {
            posClass = "last";
        }

        if (dndclass in classesState) {
            const editedClass = classesState[dndclass].editedName;
            return (
                <li key={i} className={`manage-classes-li-${classesState[dndclass].deleted ? `inactive` : `active`} ${classesState[dndclass].editing ? `edit-li` : colors[i]} ${posClass}`}>
                    {classesState[dndclass].editing ?
                        <>
                        <input
                            type="text"
                            autoFocus={true}
                            value={classesState[dndclass].editedName}
                            onChange={e => handleInput(e, dndclass)}
                            maxLength={20}
                        >
                        </input>
                        <section>
                            <FontAwesomeIcon style={{color: 'green'}} onClick={e => handleSubmitEdit(e, dndclass)} icon={faCheck}></FontAwesomeIcon>
                            <FontAwesomeIcon style={{color: 'red'}} onClick={e => handleCancelEdit(e, dndclass)} icon={faTimes}></FontAwesomeIcon>
                        </section>
                        </>
                        :
                        <>
                        <label>{editedClass}</label>
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
            newSpell.classes =  newSpellClasses.length > 0 ? newSpellClasses.join(",") : "";
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
        newState[field].prevName = classesState[field].editedName;
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
        if( classesState[field].editedName.length > 0  ) {
            newState[field].editing = false;
            newState[field].prevName = newState[field].editedName;
        } else {
            newState[field].deleted = true;
        }
        setClasses(newState);
    }

    const handleCancelEdit = (event, field) => {
        event.preventDefault();
        const newState = merge({}, classesState);
        newState[field].editedName = classesState[field].prevName;
        newState[field].editing = false;
        setClasses(newState);
    }

    return(
        <form className="modal-form" id="manage-classes">
            <h1>Classes</h1>
            <ol>
                {classButtons}
            </ol>
            <section>
                <button onClick={e => handleCloseButton(e)}>Cancel</button>
                <button onClick={e => handleSaveButton(e)}>Save</button>
            </section>
        </form>
    )
};

export default ManageClasses;