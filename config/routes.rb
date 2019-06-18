Rails.application.routes.draw do
  resources :restaurants
  get '/restaurant', to: "restaurants#restaurant", as: "restaurant_path"
  get 'restaurants/search_nearby', to: "restaurants#search_nearby", as: "search_nearby_restaurant"
  get 'restaurants/search_restaurant', to: "restaurants#update_search", as: "search_restaurant"
  root "pages#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
