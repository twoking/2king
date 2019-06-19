require 'json'
require 'open-uri'

class RestaurantsController < ApplicationController
  def index
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    byebug
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


# def search_nearby
#   lat = params[:coordinates][:lat]
#   lng = params[:coordinates][:lng]
#   url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lng}&radius=2000&type=restaurant&fields=photos,formatted_address,name,rating,opening_hours,geometry,athmosphere&key=#{ENV['GOOGLE_PLACES']}"
#   user_serialized = open(url).read
#   restaurants = JSON.parse(user_serialized)
#   @restaurants = restaurants["results"].map! do |resto|
#     {
#       name: resto["name"],
#       id: resto["id"],
#       open_now: resto["opening_hours"],
#       photo: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=#{resto["photos"].first["photo_reference"] if resto["photos"]}&key=#{ENV['GOOGLE_PLACES']}",
#       price_level: resto["price_level"],
#       rating: resto["rating"],
#       total_rating: resto["user_ratings_total"]
#     }
#   end
#   respond_to do |format|
#     format.js
#     format.html { redirect_to search_restaurant_path(@restaurants) }
#   end
# end


# def search_restaurant
#   respond_to do |format|
#     format.js
#     format.html { redirect_to search_restaurant_path(@restaurants) }
#   end
# end
