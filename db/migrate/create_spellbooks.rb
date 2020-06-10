class CreateSpellbooks < ActiveRecord::Migration[6.0]
  def change
    create_table :spellbooks do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.text :desc

      t.index :url, unique: true

      t.timestamps
    end
  end
end
