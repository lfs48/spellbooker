import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {intToOrdinal} from '../../util/functions/util_functions'
import {capitalize, merge} from 'lodash';
import { focusSpell, closeSpell } from '../../actions/ui/selected_spell_actions';
import { openModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';

const Spell = (props) => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [styleData, setStyleData] = useState({
        left: Math.floor( Math.random() * (window.innerWidth - $(`#spell-list-sidebar`).outerWidth(true) - 500 ) ) + $(`#spell-list-sidebar`).outerWidth(true),
        top: Math.floor( Math.random() * (window.innerHeight - $(`#spellbook-name-header`).outerHeight(true) - $(`#filters-nav`).outerHeight(true) - 400 ) ) + $(`#spellbook-name-header`).outerHeight(true) + $(`#filters-nav`).outerHeight(true),
        width: 500,
        height: 400,
        minHeight: 50,
        minWidth: 225,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null
    });

    const selectedSpell = props.spell

    const handleDoubleClick = (event) => {
        const newState = merge({}, styleData);
        if (newState.height > newState.minHeight || newState.width > newState.minWidth) {
            newState.height = newState.minHeight;
            newState.width = newState.minWidth;
        } else if (newState.height === newState.minHeight && newState.width === newState.minWidth) {
            newState.height = 400;
            newState.width = 500;
        }
        setStyleData(newState);

    }

    const resizeUp = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageY > 0) {
            const newHeight = newState.height + newState.top - event.pageY;
            newState.height = Math.max(newHeight, newState.minHeight);
            if (newState.height != styleData.height) {newState.top = event.pageY};
        }

        setStyleData(newState);
    }

    const resizeDown = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageY > 0) {
            const newHeight = event.pageY - newState.top;
            newState.height = Math.max(newHeight, newState.minHeight);
        }
        setStyleData(newState);
    }

    const resizeRight = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageX > 0) {
            const newWidth = newState.width + event.pageX - newState.left - $(`#spell-${selectedSpell.id}`).outerWidth(true)
            newState.width = Math.max( newWidth, newState.minWidth );
        }

        setStyleData(newState);
    }

    const resizeLeft = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageX > 0) {
            const newWidth = newState.width + newState.left - event.pageX;
            newState.width = Math.max(newWidth, newState.minWidth);
            if (newState.width != styleData.width) {newState.left = event.pageX; }
        }

        setStyleData(newState);
    }

    const handleDragStart = (event) => {
        event.preventDefault();
        if (!styleData.dragging) {
            const newState = merge({}, styleData);
            newState.dragPrevX = event.pageX;
            newState.dragPrevY = event.pageY;
            newState.dragging = true;
            setStyleData(newState);
        }
    }

    const handleDrag = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (styleData.dragging) {
            if (event.pageX > 0) {
                newState.left += event.pageX - styleData.dragPrevX;
                newState.left = Math.max(newState.left, 0);
                newState.left = Math.min( (newState.left + $(`#spell-${selectedSpell.id}`).outerWidth(true)) , window.innerWidth) - $(`#spell-${selectedSpell.id}`).outerWidth(true);
                newState.dragPrevX = event.pageX;
            }
            if (event.pageY > 0) {
                newState.top += event.pageY - styleData.dragPrevY;
                newState.top = Math.min(newState.top, window.innerHeight - styleData.height);
                newState.top = Math.max(newState.top, 0);
                newState.dragPrevY = event.pageY;
            }
            setStyleData(newState);
        } else {
            handleDragStart(event);
        }
    }

    const handleDragEnd = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        newState.dragPrevX = 0;
        newState.dragPrevY = 0;
        newState.dragging = false;
        setStyleData(newState);
    }

    const bringToFront = (event) => {
        dispatch( focusSpell(selectedSpell.id) );
    }

    const handleClose = (event) => {
        dispatch( closeSpell(selectedSpell.id) );
    }

    const handleEdit = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm", {id: selectedSpell.id}) );
    }

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch( openModal("DeleteSpellConfirmation", {id: selectedSpell.id}) )
    }
    
    return(
        <article id={`spell-${selectedSpell.id}`} className={"spell-container resizable" + " " + `${props.isFocus ? "focus-spell" : "unfocus-spell"}`} 
        style={styleData} onMouseDown={e => bringToFront(e)}>
            <div className="resize-areas-container">
                <div draggable="true" className="resize-area resize-top" onDrag={e => resizeUp(e)} ></div>
                <div draggable="true" className="resize-area resize-left" onDrag={e => resizeLeft(e)}></div>
                <div draggable="true" className="resize-area resize-bottom" onDrag={e => resizeDown(e)} ></div>
                <div draggable="true" className="resize-area resize-right" onDrag={e => resizeRight(e)}></div>
            </div>

            <header className="spell-header" draggable="true" onDrag={e => handleDrag(e)} 
            onDragEnd={e => handleDragEnd(e)} onDoubleClick={e => handleDoubleClick(e)}>
                <h1>{selectedSpell.name}</h1>
                <section className="spell-button-section">
                    { location.pathname.slice(11) != "srd" ?<FontAwesomeIcon icon={faEdit} className="spell-edit-button" onClick={e => handleEdit(e)}/> : <></> }
                    { location.pathname.slice(11) != "srd" ?<FontAwesomeIcon icon={faTrash} className="spell-delete-button" onClick={e => handleDelete(e)}/> : <></> }
                    <FontAwesomeIcon icon={faTimes} className="spell-close-button" onClick={e => handleClose(e)} />
                </section>
            </header>

            <section className="spell-info" style={{height: styleData.height-50}}>
                <section className="spell-details">
                    <div style={{height: '0.5em'}}></div>
                    <i>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school} {selectedSpell.ritual? "(ritual)" : ""}</i>
                    <dl>
                        <dt>Classes</dt>
                        <dd>: {selectedSpell.classes.split(",").map(dndclass => capitalize(dndclass)).join(", ")}</dd>
                    </dl>
                    <dl>
                        <dt>Casting Time</dt>
                        <dd>: {selectedSpell.casting_time}</dd>
                    </dl>
                    <dl>
                        <dt>Range</dt>
                        <dd>: {selectedSpell.range}</dd>
                    </dl>
                    <dl>
                        <dt>Components</dt>
                        <dd>: {selectedSpell.components} {selectedSpell.material ? `(${selectedSpell.material})` : ""}</dd>
                    </dl>
                    <dl>
                        <dt>Duration</dt>
                        <dd>: {selectedSpell.duration} {selectedSpell.concentration ? "(concentration)" : ""}</dd>
                    </dl>

                </section>

                <section className="spell-desc">
                    <p>{selectedSpell.desc.join("\n\n")}</p>
                    <label>{selectedSpell.higher_level ? `\nAt Higher Levels.\n\n` : ""}</label>
                    <p>{selectedSpell.higher_level ? `${selectedSpell.higher_level.join("\n\n")}` : ""} </p>
                </section>

            </section>
        </article>
    )

}

export default Spell;