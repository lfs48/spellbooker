import React from 'react';
import {useDispatch} from 'react-redux';
import {dndclassList} from '../../data/dndclasses';
import { selectClass, selectLevel } from '../../actions/ui/filter_actions';
import { intToOrdinal } from '../../util/functions/util_functions';

const Filter = () => {

    const dispatch = useDispatch();

    const classOptions = dndclassList.map( (dndclass, i) => {
        return <option key={i} value={dndclass}>{dndclass}</option>
    });

    const levelOptions = [...Array(10).keys()].map( (level, i) => {
        return <option key={i} value={level}>{intToOrdinal(level)}</option>
    });

    const handleClassSelect = (event) => {
        event.preventDefault();
        let className = event.target.value;
        if (className === "—") {className = null;}
        dispatch( selectClass(className) );
    };

    const handleLevelSelect = (event) => {
        event.preventDefault();
        let level = event.target.value;
        if (level === "—") {level = null;}
        dispatch( selectLevel(level) );
    };

    return(
        <header id="spell-filters-bar">
            <label>Class</label>
            <select onChange={e => handleClassSelect(e)}>
                <option value="—">—</option>
                {classOptions}
            </select>
            <label>Level</label>
            <select onChange={e => handleLevelSelect(e)}>
                <option value="—">—</option>
                {levelOptions}
            </select>
        </header>
    )
}

export default Filter;