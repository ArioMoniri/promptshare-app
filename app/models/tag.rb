class Tag < ApplicationRecord
  has_many :prompt_tags
  has_many :prompts, through: :prompt_tags

  validates :name, presence: true, uniqueness: true, length: { minimum: 1, maximum: 30 }
end

