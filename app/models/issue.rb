class Issue < ApplicationRecord
  belongs_to :user
  belongs_to :prompt

  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :status, presence: true, inclusion: { in: ['open', 'closed'] }
end

