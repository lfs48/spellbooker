class Spellbook < ApplicationRecord

    validates :name, :edit_url, :share_url, :spells, :classes, presence: true

    def self.find_by_url(url)
        return Spellbook.find_by(share_url: url) || Spellbook.find_by(edit_url: url)
    end

    def initialize_data
        self.ensure_url
        self.populate_initial_spells
        self.populate_initial_classes
    end

    def ensure_url
        edit_url = SecureRandom.alphanumeric(16)
        spellbook = Spellbook.find_by_url(edit_url)
        while spellbook
            edit_url = SecureRandom.alphanumeric(16)
            spellbook = Spellbook.find_by_url(edit_url)
        end
        self.edit_url = edit_url

        share_url = SecureRandom.alphanumeric(16)
        spellbook = Spellbook.find_by_url(share_url)
        while spellbook
            share_url = SecureRandom.alphanumeric(16)
            spellbook = Spellbook.find_by_url(share_url)
        end
        self.share_url = share_url
    end

    def populate_initial_spells
        self.spells = Spellbook.first.spells.clone
    end

    def populate_initial_classes
        self.classes = Spellbook.first.classes.clone
    end

    def reset_to_srd
        self.populate_initial_spells
        self.populate_initial_classes
    end

end
