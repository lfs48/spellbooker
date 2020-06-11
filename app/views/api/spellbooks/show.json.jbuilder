json.post do 
    json.partial! "api/spellbooks/spellbook", spellbook: @spellbook
end