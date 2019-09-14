require 'json'
require 'open-uri'
class RestaurantsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show]
  def index
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.photos = params[:restaurant][:photos]
    @restaurant.opening_hours = params[:restaurant][:opening_hours].split("<")
    @restaurant.save unless Restaurant.find_by(place_id: @restaurant.place_id)
    current_user.add_restaurant(@restaurant)
    @list = List.find_by(user: current_user, restaurant: @restaurant)
    respond_to do |format|
      format.js
      format.html { redirect_to root_path }
    end
  end

  def show
    @restaurant = Restaurant.find_by(place_id: params[:id])
    @restaurant = Restaurant.api_search(params[:id]) unless @restaurant
    @list = @restaurant.user_list(current_user) if @restaurant.id
    @recommended_by = @restaurant.lists.pluck(:user_id).map { |id| User.find(id).name if id != current_user.id }.compact
  end

  def filter
    degreesFilter = params[:degreesFilter].nil? ? [] : params[:degreesFilter]
    userFilter = params[:ownList].nil? ? false : params[:ownList] == "true"
    friendFilter = params[:friendIds].nil? ? [] : params[:friendIds].uniq.map { |id| User.find(id) }

    @filtered_restaurants = current_user.restaurants_filter(degrees: degreesFilter, with_own_list: userFilter, friends: friendFilter)

    respond_to do |format|
      format.json { render json: @filtered_restaurants }
    end
  end

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :phone_number, :place_id, :latitude, :longitude, :price_level, :place_id, :website)
  end
end
