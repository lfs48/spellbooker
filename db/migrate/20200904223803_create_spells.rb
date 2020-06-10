class CreateSpells < ActiveRecord::Migration[6.0]
  def change
    create_table :spells do |t|
      t.string :name, null: false
      t.string :range, null: false
      t.integer :level, null: false
      t.boolean :verbal
      t.boolean :somatic
      t.boolean :material
      t.string :material_desc
      t.boolean :ritual
      t.boolean :conc
      t.string :duration
      t.string :cast_time
      t.string :school
      t.string :damage_type
      t.string :classes
      t.text :desc, null: false
      t.text :notes
      t.integer :spellbook_id, null: false

      t.index :name

      t.timestamps
    end
  end
end
