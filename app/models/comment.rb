class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :prompt

  validates :content, presence: true, length: { minimum: 1, maximum: 1000 }
end

