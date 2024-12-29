require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(user).to be_valid
    end

    it 'is not valid without a username' do
      user.username = nil
      expect(user).to_not be_valid
    end

    it 'is not valid with a username less than 3 characters' do
      user.username = 'ab'
      expect(user).to_not be_valid
    end

    it 'is not valid with a username more than 30 characters' do
      user.username = 'a' * 31
      expect(user).to_not be_valid
    end

    it 'is not valid without an email' do
      user.email = nil
      expect(user).to_not be_valid
    end

    it 'is not valid with an invalid email format' do
      user.email = 'invalid_email'
      expect(user).to_not be_valid
    end

    it 'is not valid without a password' do
      user.password = nil
      expect(user).to_not be_valid
    end

    it 'is not valid with a password less than 8 characters' do
      user.password = 'short'
      expect(user).to_not be_valid
    end

    it 'is not valid without a name' do
      user.name = nil
      expect(user).to_not be_valid
    end

    it 'is not valid without a surname' do
      user.surname = nil
      expect(user).to_not be_valid
    end
  end

  describe 'associations' do
    it { should have_many(:prompts) }
    it { should have_many(:comments) }
    it { should have_many(:likes) }
    it { should have_many(:stars) }
    it { should have_many(:forks) }
    it { should have_many(:issues) }
  end

  describe 'instance methods' do
    describe '#set_openai_api_key' do
      it 'sets the OpenAI API key' do
        api_key = 'test_api_key'
        user.set_openai_api_key(api_key)
        expect(user.openai_api_key).to eq(api_key)
      end
    end

    describe '#clear_openai_api_key' do
      it 'clears the OpenAI API key' do
        user.set_openai_api_key('test_api_key')
        user.clear_openai_api_key
        expect(user.openai_api_key).to be_nil
      end
    end
  end
end

