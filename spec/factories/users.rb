FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.username(specifier: 5..20) }
    email { Faker::Internet.unique.email }
    password { 'password123' }
    name { Faker::Name.first_name }
    surname { Faker::Name.last_name }
  end
end

