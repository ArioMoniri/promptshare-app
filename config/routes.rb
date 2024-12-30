Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :update] do
        member do
          post 'set_openai_api_key'
          delete 'clear_openai_api_key'
        end
      end

      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      resources :prompts do
        member do
          post 'fork'
          post 'like'
          delete 'unlike'
          post 'star'
          delete 'unstar'
          post 'create_version'
        end
        resources :comments, only: [:index, :create, :update, :destroy]
        resources :issues, only: [:index, :create, :update, :destroy]
      end

      get '/trending', to: 'prompts#trending'
      get '/search', to: 'prompts#search'

      resources :tags, only: [:index, :show, :create]
      
      post '/prompt_tests', to: 'prompt_tests#create'
      
      get '/dashboard', to: 'dashboard#index'
    end
  end
end

