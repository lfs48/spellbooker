import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {intToOrdinal} from '../../util/functions/util_functions'
import {merge} from 'lodash';
import { focusSpell, closeSpell } from '../../actions/ui/selected_spell_actions';

const Spell = (props) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(true);
    const [styleData, setStyleData] = useState({
        left: Math.floor( Math.random() * 800 ) + 300,
        top: Math.floor( Math.random() * 300 ) + 150,
        width: 500,
        height: 400,
        minHeight: 50,
        minWidth: 200,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null
    });

    const selectedSpell = props.spell

    const handleDoubleClick = (event) => {
        event.preventDefault();
        setShow(!show);
    }

    const resizeUp = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageY > 0) {
            newState.height += newState.top - event.pageY;
            newState.top = event.pageY;
        }

        setStyleData(newState);
    }

    const resizeDown = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageY > 0) {
            newState.height = event.pageY - newState.top;
        }
        setStyleData(newState);
    }

    const resizeRight = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageX > 0) {
            newState.width += event.pageX - newState.left - $(`#spell-${selectedSpell.id}`).outerWidth(true);
        }

        setStyleData(newState);
    }

    const resizeLeft = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        if (event.pageX > 0) {
            newState.width += newState.left - event.pageX;
            newState.left = event.pageX;
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
    
    return(
        <article id={`spell-${selectedSpell.id}`} className={"spell-container resizable" + " " + `${props.isFocus ? "focus-spell" : "unfocus-spell"}`} 
        draggable="true" style={styleData} onMouseDown={e => bringToFront(e)}>
            <div className="resize-areas-container">
                <div draggable="true" className="resize-area resize-top" onDrag={e => resizeUp(e)} ></div>
                <div draggable="true" className="resize-area resize-left" onDrag={e => resizeLeft(e)}></div>
                <div draggable="true" className="resize-area resize-bottom" onDrag={e => resizeDown(e)} ></div>
                <div draggable="true" className="resize-area resize-right" onDrag={e => resizeRight(e)}></div>
            </div>

            <header className="spell-header" draggable="true" onDrag={e => handleDrag(e)} onDragEnd={e => handleDragEnd(e)}>
                <h1>{selectedSpell.name}</h1>
                <button className="spell-close-button" onClick={e => handleClose(e)}>X</button>
            </header>

            <section className="spell-info" style={{height: styleData.height-50}}>
                <section className="spell-details">
                    <div style={{height: '0.5em'}}></div>
                    <i>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school} {selectedSpell.ritual? "(ritual)" : ""}</i>
                    <dl>
                        <dt>Classes</dt>
                        <dd>: {selectedSpell.classes.split(",").join(", ")}</dd>
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
                        <dd>:{selectedSpell.duration} {selectedSpell.concentration ? "(concentration)" : ""}</dd>
                    </dl>

                </section>

                <section className="spell-desc">
                    <p>{selectedSpell.desc.join("\n\n")}</p>
                    <p>{selectedSpell.higher_level_desc ? `At Higher Levels: ${selectedSpell.higher_level_desc.join("\n")}` : ""} </p>
                    <div style={{height: '0.5em'}}></div>
                </section>
            </section>
        </article>
    )

}

export default Spell;