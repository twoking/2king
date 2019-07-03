class PagesController < ApplicationController

  def home
    @link = Link.create(user: current_user)
    gon.markers = current_user.restaurants.map { |resto| [resto.latitude, resto.longitude] }
  end
end
