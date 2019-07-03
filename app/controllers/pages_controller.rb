class PagesController < ApplicationController

  def home
    # TODO: modify this code
    @link = Link.create(user: current_user)
    gon.markers = current_user.restaurants.map do |resto|
      {lat: resto.latitude, lng: resto.longitude}
    end
  end
end
