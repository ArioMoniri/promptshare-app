module Api
  module V1
    class DashboardController < ApplicationController
      def index
        render json: {
          user: Current.user,
          user_prompts: Current.user.prompts.includes(:tags),
          liked_prompts: Current.user.liked_prompts.includes(:tags),
          recent_activity: recent_activity
        }
      end

      private

      def recent_activity
        (Current.user.prompts.order(created_at: :desc).limit(5) +
         Current.user.comments.order(created_at: :desc).limit(5) +
         Current.user.likes.order(created_at: :desc).limit(5)).sort_by(&:created_at).reverse.first(10)
      end
    end
  end
end

