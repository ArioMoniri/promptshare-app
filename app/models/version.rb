class Version < ApplicationRecord
  belongs_to :prompt

  validates :content, presence: true
  validates :version_number, presence: true, uniqueness: { scope: :prompt_id }
  validates :change_log, presence: true
end

