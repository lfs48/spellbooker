import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {openSpell} from '../../actions/ui/selected_spell_actions'
import { intToOrdinal } from '../../util/functions/util_functions';
import {useCookies} from 'react-cookie';

const SpellList = () => {

    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["bookmarks"]);

    const [sort, setSort] = useState({
        field: "name",
        order: 1
    });
    const [tab, setTab] = useState("all");
    const [olHeight, setOlHeight] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerHeight);

    window.addEventListener('resize', e => setWindowSize(window.innerHeight));

    const {spells, spellbookID, classFilter, levelFilter, schoolFilter, nameSearch, descSearch, openSpells} = useSelector(
        state => ({
            spells: Object.values(state.entities.spells),
            spellbookID: state.entities.spellbook.id,
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
                return 1 * sort.order;
            } else {
                return -1 * sort.order;
            }
        },
        level: (spellA, spellB) => {
            if (spellA.level > spellB.level) {
                return 1 * sort.order;
            } else if (spellA.level < spellB.level) {
                return -1 * sort.order;
            } else if (spellA.level === spellB.level) {
                if (spellA.name.toLowerCase() >= spellB.name.toLowerCase()) {
                    return 1;
                } else {
                    return -1;
                }
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
        }).filter( (spell) => {
            if (tab === "all") {return true}
            if ("bookmarks" in cookies && spellbookID in cookies.bookmarks) {
                return cookies.bookmarks[spellbookID].includes(spell.id);
            } else {
                return false;
            }
        }).sort( (spellA, spellB) => {
            return sortFunctions[sort.field](spellA, spellB);
        });

    let liColorClass = false;
    const spellLis = filteredSpells.map( (spell, i) => {
        liColorClass = !liColorClass;
        return (
            <li 
            id={`spell-list-li-${i}`}
            key={spell.id} 
            className={openSpells.includes(spell.id) ? "open-li" : liColorClass ? "white-li" : "dark-li"} 
            onClick={e => handleClickSpell(e, spell.id)}
            >
                <span>{spell.name}</span>
                <span>{intToOrdinal(spell.level)}</span>
            </li>
        );
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

    const handleTab = (event, tab) => {
        event.preventDefault();
        setTab(tab);
    }

    useEffect( () => {
        const lineHeight = $(`#spell-list-li-0`).outerHeight(true);
        const maxLines = Math.floor( ( $(`#spell-list-sidebar`).outerHeight(false) - $(`#spell-list-tabs`).outerHeight(false) - $(`#spell-list-sort`).outerHeight(false) ) / lineHeight);
        const newHeight = lineHeight * Math.max( Math.min(spellLis.length, maxLines), 1);
        setOlHeight(newHeight);
    }, [spellLis, windowSize]);

    return(
        <aside id="spell-list-sidebar">
            <header id="spell-list-tabs">
                <button className={tab === "all" ? "active-tab" : "inactive-tab"} onClick={e => handleTab(e, "all")}>All</button>
                <button className={tab === "bookmarked" ? "active-tab" : "inactive-tab"} onClick={e => handleTab(e, "bookmarked")}>Bookmarked</button>
            </header>
            <header id="spell-list-sort">
                <button onClick={e => switchSort(e, "name")}>Name {sort.field === "name" ? sort.order > 0 ? "▼" : "▲" : ""}</button>
                <button onClick={e => switchSort(e, "level")}>Level {sort.field === "level" ? sort.order > 0 ? "▼" : "▲" : ""}</button>
            </header>
            <ol style={ {height: olHeight} } id="spell-list-ol">
                {filteredSpells.length > 0 ?
                    spellLis
                :
                    <li id="spell-list-li-0" className="white-li">No Results</li>
                }
            </ol>
        </aside>
    )

}

export default SpellList;