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
    url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{params[:id]}&fields=address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity,formatted_phone_number,website,price_level,rating,review,user_ratings_total&key=#{Rails.application.credentials.google_places}"
    resto_serialized = open(url).read
    restaurant = JSON.parse(resto_serialized)
    @restaurant = Restaurant.new(
      name: restaurant["result"]["name"],
      address: restaurant["result"]["formatted_address"],
      phone_number: restaurant["result"]["formatted_phone_number"],
      place_id: restaurant["result"]["place_id"],
      latitude: restaurant["result"]["geometry"]["location"]["lat"],
      longitude: restaurant["result"]["geometry"]["location"]["lng"],
      price_level: restaurant["result"]["price_level"]
    )
  end

  def search_restaurant
    respond_to do |format|
      format.js
      format.html { redirect_to search_restaurant_path(@restaurants) }
    end
  end

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :phone_number, :place_id, :latitude, :longitude, :price_level)
  end
end


# def search_nearby
#   lat = params[:coordinates][:lat]
#   lng = params[:coordinates][:lng]
#   url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lng}&radius=2000&type=restaurant&fields=photos,formatted_address,name,rating,opening_hours,geometry,athmosphere&key=#{Rails.application.credentials.google_places}"
#   user_serialized = open(url).read
#   restaurants = JSON.parse(user_serialized)
#   @restaurants = restaurants["results"].map! do |resto|
#     {
#       name: resto["name"],
#       id: resto["id"],
#       open_now: resto["opening_hours"],
#       photo: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=#{resto["photos"].first["photo_reference"] if resto["photos"]}&key=#{Rails.application.credentials.google_places}",
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
