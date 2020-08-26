class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :subject, null: false
      t.string :body, null: false

      t.index :subject

      t.timestamps
    end
  end
end
