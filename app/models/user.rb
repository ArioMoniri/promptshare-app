class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar
  
  has_many :prompts
  has_many :comments
  has_many :likes
  has_many :stars
  has_many :forks
  has_many :issues

  validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 30 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 8 }, allow_nil: true
  validates :name, presence: true
  validates :surname, presence: true

  attr_encrypted :openai_api_key, key: ENV['ENCRYPTION_KEY']

  def set_openai_api_key(key)
    self.openai_api_key = key
    save
  end

  def clear_openai_api_key
    self.openai_api_key = nil
    save
  end

  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.now.utc
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  private

  def generate_token
    SecureRandom.hex(10)
  end
end

