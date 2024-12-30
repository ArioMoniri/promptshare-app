class Fork < ApplicationRecord
  belongs_to :user
  belongs_to :prompt
  belongs_to :forked_prompt, class_name: 'Prompt'

  validates :user_id, uniqueness: { scope: :prompt_id, message: "You can only fork a prompt once" }
end

