# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_04_223803) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "spellbooks", force: :cascade do |t|
    t.string "name", null: false
    t.string "url", null: false
    t.text "desc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["url"], name: "index_spellbooks_on_url", unique: true
  end

  create_table "spells", force: :cascade do |t|
    t.string "name", null: false
    t.string "range", null: false
    t.integer "level", null: false
    t.boolean "verbal"
    t.boolean "somatic"
    t.boolean "material"
    t.string "material_desc"
    t.boolean "ritual"
    t.boolean "conc"
    t.string "duration"
    t.string "cast_time"
    t.string "school"
    t.string "damage_type"
    t.string "classes"
    t.text "desc", null: false
    t.text "notes"
    t.integer "spellbook_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_spells_on_name"
  end

end
