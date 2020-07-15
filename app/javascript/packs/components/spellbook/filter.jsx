import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {dndclassList, dndSchoolList} from '../../data/dnd_data';
import { selectClass, selectLevel, selectSchool, setSearch } from '../../actions/ui/filter_actions';
import { intToOrdinal } from '../../util/functions/util_functions';
import {merge} from 'lodash';

const Filter = () => {

    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState({
        name: "",
        desc: ""
    });

    const classOptions = dndclassList.map( (dndclass, i) => {
        return <option key={i} value={dndclass}>{dndclass}</option>
    });

    const levelOptions = [...Array(10).keys()].map( (level, i) => {
        return <option key={i} value={level}>{intToOrdinal(level)}</option>
    });

    const schoolOptions = dndSchoolList.map( (school, i) => {
        return <option key={i} value={school}>{school}</option>
    });

    const handleSearchInput = (event, field) => {
        event.preventDefault();
        const newState = merge({}, searchInput);
        newState[field] = event.target.value;
        setSearchInput(newState);
    };

    const handleSearchButton = (event) => {
        event.preventDefault();
        dispatch( setSearch(searchInput) )
    }

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

    const handleSchoolSelect = (event) => {
        event.preventDefault();
        let school = event.target.value;
        if (school === "—") {school = null;}
        dispatch( selectSchool(school) );
    };

    return(
        <nav id="filters-nav">
            <section id="selects-container">
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
                <label>School</label>
                <select onChange={e => handleSchoolSelect(e)}>
                    <option value="—">—</option>
                    {schoolOptions}
                </select>
            </section>
            <section id="search-container">
                <form>
                    <section>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Fireball"
                            value={searchInput.name}
                            onChange={e => handleSearchInput(e, "name")}
                        ></input>
                    </section>
                    <section>
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="fire damage"
                            value={searchInput.desc}
                            onChange={e => handleSearchInput(e, "desc")}
                        ></input>
                    </section>
                </form>
                <button onClick={e => handleSearchButton(e)}>Search</button>
            </section>
        </nav>
    )
}

export default Filter;