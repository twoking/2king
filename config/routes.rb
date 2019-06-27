Rails.application.routes.draw do
  root "pages#home"
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :restaurants, only: [:index, :create, :show]
  resources :lists, only: [:create, :destroy, :show]
  get "/restaurants-filter", to: "restaurants#filter", as: "restaurants-filter"
  post "users/follow/:id", to: "users#follow", as: "users_follow"
  #get "list/:token" to: "users#user_list", as:"user_list"
end
