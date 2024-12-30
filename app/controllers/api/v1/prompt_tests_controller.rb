module Api
  module V1
    class PromptTestsController < ApplicationController
      def create
        openai_service = OpenaiService.new(Current.user.api_key)
        result = openai_service.test_prompt(params[:prompt], params[:model])
        render json: { result: result }
      rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
    end
  end
end

