class Like < ApplicationRecord
  belongs_to :user
  belongs_to :prompt

  validates :user_id, uniqueness: { scope: :prompt_id, message: "You can only like a prompt once" }
end

