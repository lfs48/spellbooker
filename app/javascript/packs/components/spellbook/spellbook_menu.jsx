import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faScroll, faHatWizard, faLink, faUndo, faPen, faCheck, faTimes, faDungeon, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useLocation } from 'react-router-dom';
import { updateSpellbook } from '../../actions/entities/spell_actions';

const SpellbookMenu = ({editMode}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const {bookName} = useSelector(
        state => ({
            bookName: state.entities.spellbook.name
        })
    );

    useEffect( () => {
        setNameInput(bookName);
    }, [bookName]);

    const [editingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(bookName);

    const handleCreateButton = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm") );
    }

    const handleAddClassButton = (event) => {
        event.preventDefault();
        dispatch( openModal("CreateClass") );
    }

    const handleManageClassesButton = (event) => {
        event.preventDefault();
        dispatch( openModal("ManageClasses") );
    }

    const handleResetButton = (event) => {
        event.preventDefault();
        dispatch( openModal("Reset") );
    }

    const handleShareButton = (event) => {
        event.preventDefault();
        dispatch( openModal("Share") );
    }

    const handleEditNameButton = (event) => {
        event.preventDefault();
        setEditingName(true);
    }

    const handleSubmitNameButton = (event) => {
        event.preventDefault();
        const newBook = {};
        newBook.name = nameInput;
        newBook.url = location.pathname.slice( location.pathname.indexOf("edit/") + 5 );
        dispatch( updateSpellbook(newBook) )
        .then( () => setEditingName(false) );
    }

    const handleCancelEditButton = (event) => {
        event.preventDefault();
        setNameInput(bookName);
        setEditingName(false);
    }

    const handleInput = (event) => {
        event.preventDefault();
        setNameInput(event.target.value);
    }

    return(
        <header id="spell-menu">
            <section id="menu-section-left">
                {editingName ?
                    <>
                    <input
                        id="spellbook-name-input"
                        type="text"
                        value={nameInput}
                        onChange={e => handleInput(e)}
                        spellCheck={false}
                        autoFocus={true}
                    ></input>
                    <FontAwesomeIcon id="edit-bookname-submit" icon={faCheck} onClick={e => handleSubmitNameButton(e)}/>
                    <FontAwesomeIcon id="edit-bookname-cancel" icon={faTimes} onClick={e => handleCancelEditButton(e)}/>
                    </>
                    :
                    <>
                    <b>{bookName}</b>
                    {editMode ?
                        <FontAwesomeIcon id="edit-bookname" icon={faPen} onClick={e => handleEditNameButton(e)}/>
                    :<></>}
                    </>
                }
            </section>
            <section id="menu-button-section">
            {editMode ?
                <>
                <section className="spell-menu-item" onClick={e => handleCreateButton(e) }>
                    <label>Create Spell</label>
                    <FontAwesomeIcon icon={faScroll}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleAddClassButton(e)}>
                    <label>Create Class</label>
                    <FontAwesomeIcon icon={faHatWizard}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleManageClassesButton(e)}>
                    <label>Manage Classes</label>
                    <FontAwesomeIcon icon={faUsers}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleResetButton(e) }>
                    <label>Reset to SRD</label>
                    <FontAwesomeIcon icon={faUndo}/>
                </section>
                </>
            : <></>}
                <section className="spell-menu-item" onClick={e => history.push("/spellbook/view/srd") }>
                    <label>View SRD</label>
                    <FontAwesomeIcon icon={faDungeon}/>
                </section>
                <section className="spell-menu-item" onClick={e => handleShareButton(e) }>
                    <label>Share</label>
                    <FontAwesomeIcon icon={faLink}/>
                </section>
            </section>
        </header>
    );
};

export default SpellbookMenu;