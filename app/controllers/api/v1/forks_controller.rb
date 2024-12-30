module Api
  module V1
    class ForksController < ApplicationController
      before_action :set_prompt

      def create
        @fork = @prompt.fork(Current.user)
        if @fork.persisted?
          render json: @fork, status: :created
        else
          render json: { errors: @fork.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:prompt_id])
      end
    end
  end
end

