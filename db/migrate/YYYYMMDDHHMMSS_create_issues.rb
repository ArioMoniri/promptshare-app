class CreateIssues < ActiveRecord::Migration[7.0]
  def change
    create_table :issues do |t|
      t.references :user, null: false, foreign_key: true
      t.references :prompt, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.string :status, default: 'open'

      t.timestamps
    end
  end
end

