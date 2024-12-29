class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :name, :surname, :api_key
end

