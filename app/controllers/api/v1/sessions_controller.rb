module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]

      def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          token = TokenService.encode(user_id: user.id)
          render json: { token: token, user: UserSerializer.new(user) }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def destroy
        # In a stateless API, we don't need to do anything here
        head :no_content
      end
    end
  end
end

