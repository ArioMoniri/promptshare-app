class PromptTag < ApplicationRecord
  belongs_to :prompt
  belongs_to :tag

  validates :prompt_id, uniqueness: { scope: :tag_id }
end

