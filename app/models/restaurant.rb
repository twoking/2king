require 'rest-client'

class Restaurant < ApplicationRecord

  def self.api_search(place_id)
    url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=#{place_id}"
    response = RestClient.get url, { "user-key": "55b999fc85f2826feadca8e1d2a52a83"}
    restaurant_json = JSON.parse(response.body)
    restaurant = Restaurant.new(
      name: restaurant_json["name"],
      address: restaurant_json["location"]["address"],
      phone_number: restaurant_json["phone_numbers"],
      place_id: restaurant_json["R"]["res_id"],
      latitude: restaurant_json["location"]["latitude"],
      longitude: restaurant_json["location"]["longitude"],
      price_level: restaurant_json["price_level"],
      website: restaurant_json["website"],
      opening_hours: restaurant_json["timings"]
    )
    photos_list = restaurant_json["photos"].map do |photo|
      photo["photo"]["url"]
    end
    restaurant.photos = photos_list
    return restaurant
  end

end


#code for google_places_api
# def self.api_search(place_id)
#   url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&fields=address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity,formatted_phone_number,website,price_level,rating,review,user_ratings_total&key=#{ENV['GOOGLE_PLACES']}"
#   resto_serialized = open(url).read
#   restaurant_json = JSON.parse(resto_serialized)
#   restaurant = Restaurant.new(
#     name: restaurant_json["result"]["name"],
#     address: restaurant_json["result"]["formatted_address"],
#     phone_number: restaurant_json["result"]["formatted_phone_number"],
#     place_id: restaurant_json["result"]["place_id"],
#     latitude: restaurant_json["result"]["geometry"]["location"]["lat"],
#     longitude: restaurant_json["result"]["geometry"]["location"]["lng"],
#     price_level: restaurant_json["result"]["price_level"],
#     website: restaurant_json["result"]["website"]
#   )
#   photos_list = restaurant_json["result"]["photos"][0..3].map do |photo|
#     "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=#{photo["photo_reference"]}&key=#{ENV['GOOGLE_PLACES']}"
#   end
#   restaurant.photos = photos_list
#   return restaurant
# end
