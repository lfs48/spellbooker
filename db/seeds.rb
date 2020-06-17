# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

RestClient.get("https://www.dnd5eapi.co/api/spells") do |resp, req, res|
    spell_arr = JSON.parse(resp)["results"]
    spell_arr.first(5).each do |spell_pointers|
        spell_url = spell_pointers["url"]
        RestClient.get("https://www.dnd5eapi.co#{spell_url}") do |resp, req, res|
            spell = JSON.parse(resp)
            classes = []
            spell["classes"].each {|dndclass| classes << dndclass["index"]}
            classes = classes.join(",")
            Spell.create(
                name: spell["name"],
                range: spell["range"],
                level: spell["level"],
                components: spell["components"].join(","),
                material_desc: spell["material"],
                ritual: spell["ritual"],
                conc: spell["concentration"],
                duration: spell["duration"],
                cast_time: spell["casting_time"],
                school: spell["school"]["index"],
                classes: classes,
                desc: spell["desc"],
                higher_level_desc: spell["higher_level"],
                notes: "",
                spellbook_id: 1
            )
        end
    end
end