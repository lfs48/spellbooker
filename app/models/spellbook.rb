class Spellbook < ApplicationRecord

    after_create :populate_initial_spells
    
    validates :name, :url, presence: true

    has_many :spells

    def self.generate_url
        url = SecureRandom.urlsafe_base64(16)
        spellbook = Spellbook.find_by(url: url)
        while spellbook
            url = SecureRandom.urlsafe_base64(16)
            spellbook = Spellbook.find_by(url: url)
        end
        return url
    end

    def ensure_url
        self.url ||= Spellbook.generate_url
    end

    def populate_initial_spells
        Spellbook.first.spells.first(10).each do |spell|
            new_spell = Spell.create(
                name: spell.name,
                range: spell.range,
                level: spell.level,
                components: spell.components,
                material_desc: spell.material_desc,
                ritual: spell.ritual,
                conc: spell.conc,
                duration: spell.duration,
                cast_time: spell.cast_time,
                school: spell.school,
                classes: spell.classes,
                desc: spell.desc,
                higher_level_desc: spell.higher_level_desc,
                notes: "",
                spellbook_id: self.id
            )
        end
    end

end
