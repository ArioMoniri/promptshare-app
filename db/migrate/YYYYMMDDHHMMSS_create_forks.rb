class CreateForks < ActiveRecord::Migration[7.0]
  def change
    create_table :forks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :prompt, null: false, foreign_key: true
      t.references :forked_prompt, null: false, foreign_key: { to_table: :prompts }

      t.timestamps
    end
  end
end

