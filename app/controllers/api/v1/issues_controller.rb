module Api
  module V1
    class IssuesController < ApplicationController
      before_action :set_prompt
      before_action :set_issue, only: [:show, :update, :destroy]

      def index
        @issues = @prompt.issues
        render json: @issues
      end

      def show
        render json: @issue
      end

      def create
        @issue = @prompt.issues.new(issue_params.merge(user: Current.user))
        if @issue.save
          render json: @issue, status: :created
        else
          render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @issue.update(issue_params)
          render json: @issue
        else
          render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @issue.destroy
        head :no_content
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:prompt_id])
      end

      def set_issue
        @issue = @prompt.issues.find(params[:id])
      end

      def issue_params
        params.require(:issue).permit(:title, :description, :status)
      end
    end
  end
end

