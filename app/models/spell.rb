class Spell < ApplicationRecord

    validates :name, :range, :level, :desc, presence: true

    belongs_to :spellbook

end
