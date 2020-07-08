export const fetchSpellbook = (spellbook) => {
    return $.ajax({
        method: 'GET',
        url: `api/spellbooks/`,
        data: { spellbook: spellbook }
    });
};

export const createSpellbook = (spellbook) => {
    return $.ajax({
        method: 'POST',
        url: `api/spellbooks/`,
        data: { spellbook: spellbook }
    });
};

export const updateSpellbook = (spellbook) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/spellbooks/`,
        data: { spellbook: spellbook }
    });
};

export const fetchSpell = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/spells/${id}`
    });
};

export const createSpell= (spell) => {
    return $.ajax({
        method: 'POST',
        url: `api/spells/`,
        data: { spell: spell }
    });
};