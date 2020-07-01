# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

spells = {}

RestClient.get("https://www.dnd5eapi.co/api/spells") do |resp, req, res|
    spell_arr = JSON.parse(resp)["results"]
    spell_arr.each_with_index do |spell_pointers, i|
        spell_url = spell_pointers["url"]
        RestClient.get("https://www.dnd5eapi.co#{spell_url}") do |resp, req, res|
            api_spell = JSON.parse(resp)
            spell = {}
            spell["id"] = i
            spell["name"] = api_spell["name"]
            spell["range"] = api_spell["range"]
            spell["level"] = api_spell["level"]
            spell["components"] = api_spell["components"].join(",")
            spell["material"] = api_spell["material"]
            spell["ritual"] = api_spell["ritual"]
            spell["concentration"] = api_spell["concentration"]
            spell["duration"] = api_spell["duration"]
            spell["casting_time"] = api_spell["casting_time"]
            spell["school"] = api_spell["school"]["index"]
            classes = []
            api_spell["classes"].each {|dndclass| classes << dndclass["index"]}
            classes = classes.join(",")
            spell["classes"] = classes
            spell["desc"] = api_spell["desc"]
            spell["higher_level"] = spell["higher_level"]
            spell["notes"] = ""
            spells[i] = spell
        end
    end
end

spells = spells.to_json
sb = Spellbook.create(name: "5e SRD Spellbook", url:"srd", spells: spells)
