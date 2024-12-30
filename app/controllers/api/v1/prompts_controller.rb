module Api
  module V1
    class PromptsController < ApplicationController
      before_action :set_prompt, only: [:show, :update, :destroy, :fork, :like, :unlike, :star, :unstar]
      before_action :authenticate_user, except: [:index, :show, :trending, :search]

      def index
        @prompts = Prompt.all.order(created_at: :desc).page(params[:page]).per(10)
        render json: @prompts, each_serializer: PromptSerializer
      end

      def show
        render json: @prompt, serializer: PromptSerializer
      end

      def create
        @prompt = Current.user.prompts.new(prompt_params)
        if @prompt.save
          render json: @prompt, status: :created, serializer: PromptSerializer
        else
          render json: { errors: @prompt.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @prompt.user_id == Current.user.id && @prompt.update(prompt_params)
          render json: @prompt, serializer: PromptSerializer
        else
          render json: { errors: @prompt.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @prompt.user_id == Current.user.id
          @prompt.destroy
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      def fork
        forked_prompt = @prompt.fork(Current.user)
        render json: forked_prompt, status: :created, serializer: PromptSerializer
      end

      def like
        @like = @prompt.likes.find_or_create_by(user: Current.user)
        render json: { message: 'Prompt liked successfully', likes_count: @prompt.likes.count, dislikes_count: @prompt.dislikes.count }
      end

      def unlike
        @like = @prompt.likes.find_by(user: Current.user)
        @like&.destroy
        render json: { message: 'Prompt unliked successfully', likes_count: @prompt.likes.count, dislikes_count: @prompt.dislikes.count }
      end

      def star
        @star = @prompt.stars.find_or_create_by(user: Current.user)
        render json: { message: 'Prompt starred successfully', stars_count: @prompt.stars.count }
      end

      def unstar
        @star = @prompt.stars.find_by(user: Current.user)
        @star&.destroy
        render json: { message: 'Prompt unstarred successfully', stars_count: @prompt.stars.count }
      end

      def trending
        @prompts = Prompt.trending.limit(10)
        render json: @prompts, each_serializer: PromptSerializer
      end

      def search
        @prompts = Prompt.search(params[:query], params[:tags], params[:category]).page(params[:page]).per(10)
        render json: @prompts, each_serializer: PromptSerializer
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:id])
      end

      def prompt_params
        params.require(:prompt).permit(:title, :content, :description, :category, tag_ids: [])
      end
    end
  end
end

