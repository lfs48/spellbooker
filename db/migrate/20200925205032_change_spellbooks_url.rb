class ChangeSpellbooksUrl < ActiveRecord::Migration[6.0]
  def change
    change_table :spellbooks do |t|
      t.rename :url, :edit_url
      t.string :share_url, null: false

      t.index :share_url, unique: true
    end
  end
end
