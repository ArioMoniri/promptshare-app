class PromptSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :description, :category, :tags
  belongs_to :user
end

