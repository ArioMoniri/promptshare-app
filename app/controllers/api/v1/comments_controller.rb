module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_prompt
      before_action :set_comment, only: [:show, :update, :destroy]
      before_action :authenticate_user, except: [:index]

      def index
        @comments = @prompt.comments.includes(:user).order(created_at: :desc)
        render json: @comments
      end

      def show
        render json: @comment
      end

      def create
        @comment = @prompt.comments.new(comment_params.merge(user: Current.user))
        if @comment.save
          render json: @comment, status: :created
        else
          render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @comment.user == Current.user && @comment.update(comment_params)
          render json: @comment
        else
          render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @comment.user == Current.user
          @comment.destroy
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:prompt_id])
      end

      def set_comment
        @comment = @prompt.comments.find(params[:id])
      end

      def comment_params
        params.require(:comment).permit(:content)
      end
    end
  end
end

