class PromptSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :description, :category, :created_at, :updated_at,
             :likes_count, :dislikes_count, :comments_count, :stars_count, :forks_count, :issues_count

  belongs_to :user
  has_many :tags

  def likes_count
    object.likes.count
  end

  def dislikes_count
    object.dislikes.count
  end

  def comments_count
    object.comments.count
  end

  def stars_count
    object.stars.count
  end

  def forks_count
    object.forks.count
  end

  def issues_count
    object.issues.count
  end
end

