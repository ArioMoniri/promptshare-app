FactoryBot.define do
  factory :prompt do
    title { Faker::Lorem.sentence(word_count: 3) }
    content { Faker::Lorem.paragraph(sentence_count: 3) }
    description { Faker::Lorem.sentence(word_count: 10) }
    category { ['general', 'coding', 'writing', 'business', 'creative'].sample }
    user
  end
end

