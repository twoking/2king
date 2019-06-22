class PagesController < ApplicationController
  #skip_before_action :authenticate_user!, only: [:home]
  def home
    gon.markers = current_user.restaurants.map { |resto| [resto.latitude, resto.longitude] }
  end
end
