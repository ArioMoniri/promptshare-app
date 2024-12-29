module Api
  module V1
    class PromptsController < ApplicationController
      before_action :set_prompt, only: [:show, :update, :destroy, :fork, :create_version]

      def index
        @prompts = Prompt.all
        render json: @prompts
      end

      def show
        render json: @prompt
      end

      def create
        @prompt = Current.user.prompts.new(prompt_params)
        if @prompt.save
          render json: @prompt, status: :created
        else
          render json: { errors: @prompt.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @prompt.update(prompt_params)
          render json: @prompt
        else
          render json: { errors: @prompt.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @prompt.destroy
        head :no_content
      end

      def fork
        forked_prompt = @prompt.fork(Current.user)
        render json: forked_prompt, status: :created
      end

      def create_version
        new_version = @prompt.create_new_version(version_params[:content], version_params[:change_log])
        render json: new_version, status: :created
      end

      def trending
        @prompts = Prompt.trending
        render json: @prompts
      end

      def search
        @prompts = Prompt.search(params[:query], params[:tags], params[:category])
        render json: @prompts
      end

      private

      def set_prompt
        @prompt = Prompt.find(params[:id])
      end

      def prompt_params
        params.require(:prompt).permit(:title, :content, :description, :category, tag_ids: [])
      end

      def version_params
        params.require(:version).permit(:content, :change_log)
      end
    end
  end
end

