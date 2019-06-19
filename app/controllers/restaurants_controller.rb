require 'json'
require 'open-uri'

class RestaurantsController < ApplicationController
  def index
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    if Restaurant.find_by(place_id: params[:place_id])
      #add resto to favourite
    else
      @restaurant.save
      #add resto to favourite
    end
  end

  def restaurant
     @restaurant = Restaurant.find_by(place_id: params[:id])
     @restaurant = Restaurant.api_search(params[:id]) unless @restaurant
  end

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :phone_number, :place_id, :latitude, :longitude, :price_level, :website)
  end
end
