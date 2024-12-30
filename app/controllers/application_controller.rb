class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate_user

  private

  def authenticate_user
    if (user = authenticate_token)
      Current.user = user
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      User.find_by(id: TokenService.decode(token)[:user_id])
    end
  end
end

