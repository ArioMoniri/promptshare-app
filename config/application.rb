require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"

Bundler.require(*Rails.groups)

module PromptShare
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true

    config.middleware.use Rack::Attack

    config.active_job.queue_adapter = :sidekiq

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address:              'smtp.gmail.com',
      port:                 587,
      domain:               'example.com',
      user_name:            ENV['GMAIL_USERNAME'],
      password:             ENV['GMAIL_PASSWORD'],
      authentication:       'plain',
      enable_starttls_auto: true
    }
  end
end

