import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {openSpell} from '../../actions/ui/selected_spell_actions'

const SpellList = () => {

    const dispatch = useDispatch();

    const [sort, setSort] = useState({
        field: "name",
        order: 1
    });

    const {spells, classFilter, levelFilter, schoolFilter, nameSearch, descSearch, openSpells} = useSelector(
        state => ({
            spells: Object.values(state.entities.spells),
            classLists: state.entities.dndclasses,
            classFilter: state.ui.filters.classFilter,
            levelFilter: state.ui.filters.levelFilter,
            schoolFilter: state.ui.filters.schoolFilter,
            nameSearch: state.ui.filters.search.name,
            descSearch: state.ui.filters.search.desc,
            openSpells: state.ui.openSpells
        })
    );

    const sortFunctions = {
        name: (spellA, spellB) => {
            if (spellA.name.toLowerCase() >= spellB.name.toLowerCase()) {
                return 1;
            } else {
                return -1;
            }
        }
    }

    const filteredSpells = spells.filter( (spell) => {
            if (classFilter === null) {return true }
            return spell.classes.split(",").includes(classFilter);
        }).filter( (spell) => {
            if (levelFilter === null) {return true }
            return spell.level === parseInt(levelFilter);
        }).filter( (spell) => {
            if (schoolFilter === null) {return true }
            return spell.school === schoolFilter;
        }).filter( (spell) => {
            return spell.name.toLowerCase().includes(nameSearch.toLowerCase());
        }).filter( (spell) => {
            if (descSearch === "") {return true}
            return spell.desc.join(" ").toLowerCase().includes(descSearch.toLowerCase());
        }).sort( (spellA, spellB) => {
            return sortFunctions[sort.field](spellA, spellB) * sort.order;
        });

    let liColorClass = false;
    const spellLis = filteredSpells.map( (spell, i) => {
        liColorClass = !liColorClass;
        return <li key={i} className={openSpells.includes(spell.id) ? "open-li" : liColorClass ? "white-li" : "dark-li"} onClick={e => handleClickSpell(e, spell.id)}>{spell.name}</li>
    });

    const switchSort = (event, field) => {
        event.preventDefault();
        const newState = {
            field: field,
            order: 1
        };
        if (sort.field === field) {
            newState.order = sort.order * -1;
        };
        setSort(newState);
    }

    const handleClickSpell = (event, id) => {
        event.preventDefault();
        dispatch( openSpell(id) );
    }

    return(
        <aside id="spell-list-sidebar">
                <header>
                    <button onClick={e => switchSort(e, "name")}>Name</button>
                </header>
               <ol>
                    {spellLis}
               </ol>
        </aside>
    )

}

export default SpellList;