class Prompt < ApplicationRecord
  belongs_to :user
  has_many :versions, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :stars, dependent: :destroy
  has_many :forks, dependent: :destroy
  has_many :issues, dependent: :destroy
  has_many :prompt_tags, dependent: :destroy
  has_many :tags, through: :prompt_tags

  validates :title, presence: true, length: { minimum: 3, maximum: 100 }
  validates :content, presence: true
  validates :description, presence: true, length: { minimum: 10, maximum: 500 }
  validates :category, presence: true

  def current_version
    versions.order(created_at: :desc).first
  end

  def create_new_version(content, change_log)
    new_version_number = (current_version&.version_number.to_f + 0.1).round(1).to_s
    versions.create(content: content, version_number: new_version_number, change_log: change_log)
  end

  def fork(user)
    forked_prompt = user.prompts.create(
      title: "Fork of #{title}",
      content: content,
      description: description,
      category: category,
      tags: tags
    )
    forks.create(user: user, forked_prompt: forked_prompt)
    forked_prompt
  end

  def self.trending
    joins(:likes)
      .group('prompts.id')
      .order('COUNT(likes.id) DESC, prompts.created_at DESC')
      .limit(10)
  end

  def self.search(query, tags, category)
    results = all
    results = results.where("title ILIKE ? OR description ILIKE ? OR content ILIKE ?", "%#{query}%", "%#{query}%", "%#{query}%") if query.present?
    results = results.where(category: category) if category.present?
    results = results.joins(:tags).where(tags: { name: tags }) if tags.present?
    results
  end
end


