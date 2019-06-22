Rails.application.routes.draw do
  root "pages#home"
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :restaurants, only: [:index, :create, :show]
  resources :lists, only: [:create, :destroy]
  #get '/restaurant/id', to: "restaurants#restaurant", as: "restaurant_path"
end
