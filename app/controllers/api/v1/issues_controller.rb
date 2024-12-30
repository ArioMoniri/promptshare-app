module Api
  module V1
    class IssuesController < ApplicationController
      before_action :set_prompt
      before_action :set_issue, only: [:show, :update, :destroy]
      before_action :authenticate_user, except: [:index, :show]

      def index
        @issues = @prompt.issues.includes(:user).order(created_at: :desc)
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
        if @issue.user == Current.user && @issue.update(issue_params)
          render json: @issue
        else
          render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @issue.user == Current.user
          @issue.destroy
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:prompt_id])
      end

      def set_issue
        @issue = @prompt.issues.find(params[:id])
      end

      def issue_params
        params.require(:issue).permit(:title, :description)
      end
    end
  end
end

