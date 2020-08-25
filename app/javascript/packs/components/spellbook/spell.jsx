import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {intToOrdinal} from '../../util/functions/util_functions'
import {merge} from 'lodash';
import { focusSpell, closeSpell } from '../../actions/ui/selected_spell_actions';
import { openModal } from '../../actions/ui/modal_actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimes, faPencilAlt, faTrash, faBookmark, faCopy } from '@fortawesome/free-solid-svg-icons'
import {useCookies} from 'react-cookie'

const Spell = (props) => {

    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["bookmarks"]);

    const selectedSpell = props.spell

    const {spellbookID} = useSelector(
        state => ({
            spellbookID: state.entities.spellbook.id
        })
    );

    const [styleData, setStyleData] = useState({
        left: Math.floor( Math.random() * (window.innerWidth - $(`#spell-list-sidebar`).outerWidth(true) - 500 ) ) + $(`#spell-list-sidebar`).outerWidth(true) - 100,
        top: Math.floor( Math.random() * (window.innerHeight - $(`#filters-nav`).outerHeight(true) - 400 ) ) + $(`#filters-nav`).outerHeight(true),
        width: 500,
        height: 400,
        minHeight: 50,
        minWidth: 0,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null,
        stage: 0
    });

    useEffect(() => {
        const newState = merge({}, styleData);
        newState.left += 100;
        newState.minWidth = $(`#spell-${selectedSpell.id}-name`).outerWidth() + $(`.spell-button-section`).outerWidth() + 20;
        newState.stage = 1;
        setStyleData(newState);
        setTimeout( () => {
            const newerState = merge({}, newState);
            newerState.stage = 2;
            setStyleData(newerState);
        }, 550);
    }, []);

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

    };

    const resize = (event, dirs) => {
        event.preventDefault();
        const newState = merge({}, styleData);

        if(event.pageX > 0) {
            if ("right" in dirs) {
                const newWidth = newState.width + event.pageX - newState.left - $(`#spell-${selectedSpell.id}`).outerWidth(true)
                newState.width = Math.max( newWidth, newState.minWidth );
            } else if ("left" in dirs) {
                const newWidth = newState.width + newState.left - event.pageX;
                newState.width = Math.max(newWidth, newState.minWidth);
                if (newState.width != styleData.width) {newState.left = event.pageX; }
            }
        }

        if(event.pageY > 0) {
            if ("top" in dirs) {
                const newHeight = newState.height + newState.top - event.pageY;
                newState.height = Math.max(newHeight, newState.minHeight);
                if (newState.height != styleData.height) {newState.top = event.pageY};
            } else if ("bottom" in dirs) {
                const newHeight = event.pageY - newState.top;
                newState.height = Math.max(newHeight, newState.minHeight);
            }
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
    };

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
    };

    const handleDragEnd = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        newState.dragPrevX = 0;
        newState.dragPrevY = 0;
        newState.dragging = false;
        setStyleData(newState);
    };

    const bringToFront = (event) => {
        dispatch( focusSpell(selectedSpell.id) );
    };

    const handleClose = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        newState.stage = 1;
        setStyleData(newState);
        const newerState = merge({}, newState);
        newerState.stage = 0;
        newerState.left -= 100;
        setStyleData(newerState);
        setTimeout( () => {
            dispatch( closeSpell(selectedSpell.id) );
        }, 550);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        dispatch( openModal("SpellForm", {id: selectedSpell.id}) );
    };

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch( openModal("DeleteSpellConfirmation", {id: selectedSpell.id}) )
    };

    const handleBookmark = (event) => {
        event.preventDefault();
        const newCookies = merge({}, cookies.bookmarks);
        if (spellbookID in newCookies) {
            if (newCookies[spellbookID].includes(selectedSpell.id)) {
                newCookies[spellbookID] = newCookies[spellbookID].filter(id => id != selectedSpell.id);
            } else {
                newCookies[spellbookID].push(selectedSpell.id);
            }
        } else {
            newCookies[spellbookID] = [selectedSpell.id];
        }
        setCookie("bookmarks", newCookies);
    }

    const handleCopy = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText( selectedSpell.desc.join("\n\n") );
    }
    
    return(
        <article id={`spell-${selectedSpell.id}`} className={"spell-container resizable" + ` ${props.isFocus ? "focus-spell" : "unfocus-spell"}` + `  spell-stage-${styleData.stage}`} 
        style={styleData} onMouseDown={e => bringToFront(e)}>
            <div className="resize-areas-container">
                <div draggable="true" className="resize-area resize-top" onDrag={ e => resize(e, {top: true} ) } ></div>
                <div draggable="true" className="resize-area resize-left" onDrag={ e => resize(e, {left: true} ) }></div>
                <div draggable="true" className="resize-area resize-bottom" onDrag={ e => resize(e, {bottom: true} ) } ></div>
                <div draggable="true" className="resize-area resize-right" onDrag={ e => resize(e, {right: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-bottomright" onDrag={ e => resize(e, {bottom: true, right: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-bottomleft" onDrag={ e => resize(e, {bottom: true, left: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-topright" onDrag={ e => resize(e, {top: true, right: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-topleft" onDrag={ e => resize(e, {top: true, left: true} ) }></div>
            </div>

            <header className="spell-header" draggable="true" onDrag={e => handleDrag(e)} 
            onDragEnd={e => handleDragEnd(e)} onDoubleClick={e => handleDoubleClick(e)}>
                <h1 id={`spell-${selectedSpell.id}-name`}>{selectedSpell.name}</h1>
                <section className="spell-button-section">
                    <FontAwesomeIcon icon={faBookmark} className={ ("bookmarks" in cookies && spellbookID in cookies.bookmarks && cookies.bookmarks[spellbookID].includes(selectedSpell.id) ) ? "already-bookmarked" : "not-bookmarked"} onClick={e => handleBookmark(e)}/>
                    <FontAwesomeIcon icon={faCopy} onClick={e => handleCopy(e)} />
                    { props.editMode ?<FontAwesomeIcon icon={faPencilAlt} className="spell-edit-button" onClick={e => handleEdit(e)}/> : <></> }
                    { props.editMode ?<FontAwesomeIcon icon={faTrash} className="spell-delete-button" onClick={e => handleDelete(e)}/> : <></> }
                    <FontAwesomeIcon icon={faTimes} className="spell-close-button" onClick={e => handleClose(e)} />
                </section>
            </header>

            <section className="spell-info" style={{height: styleData.height-50}}>
                <section className="spell-details">
                    <div style={{height: '0.5em'}}></div>
                    <i>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school} {selectedSpell.ritual? "(ritual)" : ""}</i>
                    <dl>
                        <dt>Classes</dt>
                        <dd>: {selectedSpell.classes.length > 0 ? selectedSpell.classes.split(",").map(dndclass => dndclass).join(", ") : "None"}</dd>
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
    );

}

export default Spell;