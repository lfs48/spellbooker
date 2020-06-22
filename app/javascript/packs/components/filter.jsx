import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dndclassList} from '../data/dndclasses';

const Filter = () => {

    const [selectedClass, setSelectedClass] = useState("all");

    const classOptions = dndclassList.map( (dndclass, i) => {
        return <option key={i} value={dndclass}>{dndclass}</option>
    });

    const handleClassSelect = (event) => {
        event.preventDefault();
        setSelectedClass(event.target.value);
    }

    return(
        <header id="spell-filters-bar">
            <label>Class</label>
            <select onChange={e => handleClassSelect(e)}>
                <option value="all">all</option>
                {classOptions}
            </select>
        </header>
    )
}

export default Filter;