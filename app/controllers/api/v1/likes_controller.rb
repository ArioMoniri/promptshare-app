module Api
  module V1
    class LikesController < ApplicationController
      before_action :set_prompt

      def create
        @like = @prompt.likes.new(user: Current.user)
        if @like.save
          render json: { message: 'Prompt liked successfully' }, status: :created
        else
          render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @like = @prompt.likes.find_by(user: Current.user)
        if @like
          @like.destroy
          head :no_content
        else
          render json: { error: 'Like not found' }, status: :not_found
        end
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:prompt_id])
      end
    end
  end
end

