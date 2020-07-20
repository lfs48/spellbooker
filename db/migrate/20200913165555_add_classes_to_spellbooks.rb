class AddClassesToSpellbooks < ActiveRecord::Migration[6.0]
  def change
    change_table :spellbooks do |t|
      t.string :classes, null: false
    end
  end
end
