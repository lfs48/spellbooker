json.extract! spellbook, :id, :name, :url, :desc

json.spells do
    @spellbook.spells.each do |spell|
        json.set! spell.id do
            json.partial! "api/spells/spell", spell: spell
        end
    end
end