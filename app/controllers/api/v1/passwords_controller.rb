module Api
  module V1
    class PasswordsController < ApplicationController
      skip_before_action :authenticate_user

      def forgot
        user = User.find_by(email: params[:email])
        if user
          user.generate_password_token!
          UserMailer.reset_password_email(user).deliver_later
          render json: { message: 'Password reset email sent' }, status: :ok
        else
          render json: { error: 'Email address not found' }, status: :not_found
        end
      end

      def reset
        token = params[:token].to_s
        user = User.find_by(reset_password_token: token)

        if user && user.password_token_valid?
          if user.reset_password!(params[:password])
            render json: { message: 'Password reset successful' }, status: :ok
          else
            render json: { error: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid or expired token' }, status: :not_found
        end
      end
    end
  end
end

