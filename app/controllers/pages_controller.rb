class PagesController < ApplicationController

  def home
    # TODO: modify this code
    @link = Link.create(user: current_user)
    gon.restos = current_user.restaurants
  end
end
