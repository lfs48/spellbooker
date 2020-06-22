import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dndclassList} from '../../data/dndclasses';
import { selectClass } from '../../actions/ui/filter_actions';

const Filter = () => {

    const dispatch = useDispatch();

    const classOptions = dndclassList.map( (dndclass, i) => {
        return <option key={i} value={dndclass}>{dndclass}</option>
    });

    const handleClassSelect = (event) => {
        event.preventDefault();
        let className = event.target.value;
        if (className === "—") {className = null;}
        dispatch( selectClass(className) );
    };

    return(
        <header id="spell-filters-bar">
            <label>Class</label>
            <select onChange={e => handleClassSelect(e)}>
                <option value="—">—</option>
                {classOptions}
            </select>
        </header>
    )
}

export default Filter;