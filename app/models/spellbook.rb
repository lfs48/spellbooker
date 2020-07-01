class Spellbook < ApplicationRecord

    validates :name, :url, :spells, presence: true

    def self.generate_url
        url = SecureRandom.alphanumeric(16)
        spellbook = Spellbook.find_by(url: url)
        while spellbook
            url = SecureRandom.alphanumeric(16)
            spellbook = Spellbook.find_by(url: url)
        end
        return url
    end

    def ensure_url
        self.url ||= Spellbook.generate_url
    end

    def populate_initial_spells
        self.spells = Spellbook.first.spells.clone
    end

end
