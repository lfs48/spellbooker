class CreateSpells < ActiveRecord::Migration[6.0]
  def change
    create_table :spells do |t|
      t.string :name, null: false
      t.string :range, null: false
      t.integer :level, null: false
      t.string :components
      t.string :material_desc
      t.boolean :ritual
      t.boolean :conc
      t.string :duration
      t.string :cast_time
      t.string :school
      t.string :classes
      t.text :desc, null: false
      t.text :higher_level_desc
      t.text :notes
      t.integer :spellbook_id, null: false

      t.index :name

      t.timestamps
    end
  end
end
