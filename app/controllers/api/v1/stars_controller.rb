module Api
  module V1
    class StarsController < ApplicationController
      before_action :set_prompt

      def create
        @star = @prompt.stars.new(user: Current.user)
        if @star.save
          render json: { message: 'Prompt starred successfully' }, status: :created
        else
          render json: { errors: @star.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @star = @prompt.stars.find_by(user: Current.user)
        if @star
          @star.destroy
          head :no_content
        else
          render json: { error: 'Star not found' }, status: :not_found
        end
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:prompt_id])
      end
    end
  end
end

