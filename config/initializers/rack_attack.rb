class Rack::Attack
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Limit all POST requests to 5 per second per IP
  throttle('req/ip', limit: 5, period: 1.second) do |req|
    req.ip if req.post?
  end

  # Limit login attempts for a given email to 6 per minute
  throttle("logins/email", limit: 6, period: 60.seconds) do |req|
    if req.path == '/api/v1/login' && req.post?
      req.params['email'].to_s.downcase.gsub(/\s+/, "")
    end
  end
end

