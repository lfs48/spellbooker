json.post do 
    json.partial! "api/spells/spell", spell: @spell
end