require 'rails_helper'

RSpec.describe Prompt, type: :model do
  let(:prompt) { build(:prompt) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(prompt).to be_valid
    end

    it 'is not valid without a title' do
      prompt.title = nil
      expect(prompt).to_not be_valid
    end

    it 'is not valid with a title less than 3 characters' do
      prompt.title = 'ab'
      expect(prompt).to_not be_valid
    end

    it 'is not valid with a title more than 100 characters' do
      prompt.title = 'a' * 101
      expect(prompt).to_not be_valid
    end

    it 'is not valid without content' do
      prompt.content = nil
      expect(prompt).to_not be_valid
    end

    it 'is not valid without a description' do
      prompt.description = nil
      expect(prompt).to_not be_valid
    end

    it 'is not valid with a description less than 10 characters' do
      prompt.description = 'a' * 9
      expect(prompt).to_not be_valid
    end

    it 'is not valid with a description more than 500 characters' do
      prompt.description = 'a' * 501
      expect(prompt).to_not be_valid
    end

    it 'is not valid without a category' do
      prompt.category = nil
      expect(prompt).to_not be_valid
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:versions).dependent(:destroy) }
    it { should have_many(:comments).dependent(:destroy) }
    it { should have_many(:likes).dependent(:destroy) }
    it { should have_many(:stars).dependent(:destroy) }
    it { should have_many(:forks).dependent(:destroy) }
    it { should have_many(:issues).dependent(:destroy) }
    it { should have_many(:prompt_tags).dependent(:destroy) }
    it { should have_many(:tags).through(:prompt_tags) }
  end

  describe 'instance methods' do
    describe '#current_version' do
      it 'returns the most recent version' do
        prompt.save
        old_version = prompt.versions.create(content: 'Old content', version_number: '1.0')
        new_version = prompt.versions.create(content: 'New content', version_number: '1.1')
        expect(prompt.current_version).to eq(new_version)
      end
    end

    describe '#create_new_version' do
      it 'creates a new version with incremented version number' do
        prompt.save
        prompt.versions.create(content: 'Initial content', version_number: '1.0')
        new_version = prompt.create_new_version('Updated content', 'Updated prompt')
        expect(new_version.version_number).to eq('1.1')
        expect(new_version.content).to eq('Updated content')
        expect(new_version.change_log).to eq('Updated prompt')
      end
    end

    describe '#fork' do
      it 'creates a forked prompt for another user' do
        original_prompt = create(:prompt)
        forking_user = create(:user)
        forked_prompt = original_prompt.fork(forking_user)

        expect(forked_prompt.user).to eq(forking_user)
        expect(forked_prompt.title).to start_with('Fork of')
        expect(forked_prompt.content).to eq(original_prompt.content)
        expect(forked_prompt.description).to eq(original_prompt.description)
        expect(forked_prompt.category).to eq(original_prompt.category)
        expect(forked_prompt.tags).to eq(original_prompt.tags)
      end
    end
  end

  describe 'class methods' do
    describe '.trending' do
      it 'returns prompts ordered by likes count' do
        most_liked = create(:prompt)
        least_liked = create(:prompt)
        middle_liked = create(:prompt)

        create_list(:like, 3, prompt: most_liked)
        create_list(:like, 2, prompt: middle_liked)
        create_list(:like, 1, prompt: least_liked)

        trending = Prompt.trending
        expect(trending.to_a).to eq([most_liked, middle_liked, least_liked])
      end
    end

    describe '.search' do
      it 'returns prompts matching the search criteria' do
        matching_prompt = create(:prompt, title: 'Ruby on Rails', category: 'coding')
        non_matching_prompt = create(:prompt, title: 'JavaScript', category: 'coding')
        
        results = Prompt.search('Ruby', [], 'coding')
        expect(results).to include(matching_prompt)
        expect(results).not_to include(non_matching_prompt)
      end
    end
  end
end

