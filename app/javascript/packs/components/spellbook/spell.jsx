import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {intToOrdinal} from '../../util/functions/util_functions'
import {merge} from 'lodash';

const Spell = () => {

    const dispatch = useDispatch();

    const [selectedSpellId, setSelectedSpellId] = useState(0);
    const [show, setShow] = useState(true);
    const [styleData, setStyleData] = useState({
        left: 400,
        top: 200,
        width: 400,
        height: 100
    });

    const {selectedSpell} = useSelector(
        state => ({
            selectedSpell: state.entities.spells[state.ui.selectedSpell] ? state.entities.spells[state.ui.selectedSpell] : {name:"", range: "", level: "", components:"", material:"", ritual: false, concentration: false, duration: "", casting_time: "", school: "", classes: "", desc: [], higher_level_desc: [], notes: ""}
        })
    );

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
            newState.width += event.pageX - newState.left - $('.resizable').outerWidth(true);
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
    
    return(
        <article className={"resizable" + " " + `${show ? "open-spell" : "hidden-spell"}`}
         onDoubleClick={e => handleDoubleClick(e)} id="spell-container"
         style={styleData}>
            <div id="resize-areas-container">
                <div draggable="true" className="resize-area" id="resize-top" onDrag={e => resizeUp(e)} ></div>
                <div draggable="true" className="resize-area" id="resize-left" onDrag={e => resizeLeft(e)}></div>
                <div draggable="true" className="resize-area" id="resize-bottom" onDrag={e => resizeDown(e)} ></div>
                <div draggable="true" className="resize-area" id="resize-right" onDrag={e => resizeRight(e)}></div>
            </div>

            <section id="spell-info">
                <h1>{selectedSpell.name}</h1>
                <section id="spell-details">
                    <span>{intToOrdinal(selectedSpell.level)}-level {selectedSpell.school} {selectedSpell.ritual? "(ritual)" : ""}</span>
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

                <section id="spell-desc">
                    <p>{selectedSpell.desc.join("\n\n")}</p>
                    <p>{selectedSpell.higher_level_desc ? `At Higher Levels: ${selectedSpell.higher_level_desc.join("\n")}` : ""} </p>
                </section>
            </section>

        </article>
    )

}

export default Spell;