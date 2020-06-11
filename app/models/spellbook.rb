class Spellbook < ApplicationRecord

    validates :name, :url, presence: true

    has_many :spells

end
