class Restaurant < ApplicationRecord

  validates_presence_of :place_id, :name, :address









  def open_now?
    today_day = Date.today.strftime("%A")
    today_schedule = self.opening_hours.select {|d| d.include?(today_day)}.first.split(" ")
    morning_opening = today_schedule[1].to_i
    evening_close = today_schedule[-2].to_i + 12
    (morning_opening..evening_close).include?(Time.now.hour)
  end


  def self.api_search(place_id)
    url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&fields=address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,plus_code,scope,type,url,utc_offset,vicinity,formatted_phone_number,website,price_level,opening_hours,rating,review,user_ratings_total&key=#{ENV['GOOGLE_API_KEY']}"
    resto_serialized = open(url).read
    restaurant_json = JSON.parse(resto_serialized)
    restaurant = Restaurant.new(
      name: restaurant_json["result"]["name"],
      address: restaurant_json["result"]["formatted_address"],
      phone_number: restaurant_json["result"]["formatted_phone_number"],
      place_id: restaurant_json["result"]["place_id"],
      latitude: restaurant_json["result"]["geometry"]["location"]["lat"],
      longitude: restaurant_json["result"]["geometry"]["location"]["lng"],
      price_level: restaurant_json["result"]["price_level"],
      website: restaurant_json["result"]["website"],
      opening_hours: restaurant_json["result"]["opening_hours"]["weekday_text"]
    )
    restaurant_json["result"]["photos"][0..3].map do |photo|
      restaurant.photos << "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=#{photo["photo_reference"]}&key=#{ENV['GOOGLE_API_KEY']}"
    end
    return restaurant
  end

end
