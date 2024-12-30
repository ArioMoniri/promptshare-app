module Api
  module V1
    class EmailConfirmationsController < ApplicationController
      skip_before_action :authenticate_user

      def confirm
        token = params[:token].to_s
        user = User.find_by(confirmation_token: token)

        if user
          user.confirm!
          render json: { message: 'Email confirmed successfully' }, status: :ok
        else
          render json: { error: 'Invalid confirmation token' }, status: :not_found
        end
      end
    end
  end
end

