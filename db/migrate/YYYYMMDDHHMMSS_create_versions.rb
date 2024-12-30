class CreateVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :versions do |t|
      t.references :prompt, null: false, foreign_key: true
      t.text :content
      t.string :version_number
      t.text :change_log

      t.timestamps
    end
  end
end

