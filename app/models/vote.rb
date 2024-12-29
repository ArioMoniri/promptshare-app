class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :prompt

  validates :value, inclusion: { in: [-1, 1] }
  validates :user_id, uniqueness: { scope: :prompt_id }
end

