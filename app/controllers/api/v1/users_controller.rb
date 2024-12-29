module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]
      before_action :set_user, only: [:show, :update, :destroy]

      def index
        @users = User.all
        render json: @users
      end

      def show
        render json: @user
      end

      def create
        @user = User.new(user_params)
        if @user.save
          token = TokenService.encode(user_id: @user.id)
          render json: { token: token, user: UserSerializer.new(@user) }, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @user.destroy
        head :no_content
      end

      def set_openai_api_key
        if Current.user.set_openai_api_key(params[:api_key])
          render json: { message: 'API key set successfully' }
        else
          render json: { errors: Current.user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def clear_openai_api_key
        if Current.user.clear_openai_api_key
          render json: { message: 'API key cleared successfully' }
        else
          render json: { errors: Current.user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:username, :email, :password, :name, :surname)
      end
    end
  end
end

