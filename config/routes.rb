Rails.application.routes.draw do
  root "pages#home"
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :restaurants, only: [:index, :create]
  get '/restaurant', to: "restaurants#restaurant", as: "test"
  # get 'restaurants/search_nearby', to: "restaurants#search_nearby", as: "search_nearby_restaurant"
  # get 'restaurants/search_restaurant', to: "restaurants#update_search", as: "search_restaurant"

end
