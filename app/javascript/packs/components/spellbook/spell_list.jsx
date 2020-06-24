import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSpell} from '../../actions/ui/selected_spell_actions'

const SpellList = () => {

    const dispatch = useDispatch();

    const {spells, classFilter, levelFilter, schoolFilter} = useSelector(
        state => ({
            spells: Object.values(state.entities.spells),
            classLists: state.entities.dndclasses,
            classFilter: state.ui.filters.classFilter,
            levelFilter: state.ui.filters.levelFilter,
            schoolFilter: state.ui.filters.schoolFilter,
        })
    );

    const filteredSpells = spells.filter( (spell) => {
            if (classFilter === null) {return true }
            return spell.classes.split(",").includes(classFilter);
        }).filter( (spell) => {
            if (levelFilter === null) {return true }
            return spell.level === parseInt(levelFilter);
        }).filter( (spell) => {
            if (schoolFilter === null) {return true }
            return spell.school === schoolFilter;
        });

    const spellLis = filteredSpells.slice(0,9).map( (spell, i) => {
        return <li key={i} onClick={e => handleClickSpell(e, spell.id)}>{spell.name}</li>
    });

    const handleClickSpell = (event, id) => {
        event.preventDefault();
        dispatch( selectSpell(id) );
    }

    return(
        <aside id="spell-list-sidebar">
               <ol>
                    {spellLis}
               </ol>
        </aside>
    )

}

export default SpellList;