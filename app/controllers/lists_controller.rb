class ListsController < ApplicationController

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    @list = List.create(user: current_user, restaurant: restaurant)
    respond_to do |format|
      format.js
      format.html { redirect_to root_path }
    end
  end

  def destroy
    @list = List.find(params[:id])
    @restaurant = @list.restaurant
    @list.destroy
    respond_to do |format|
      format.js
      format.html { redirect_to root_path }
    end
  end
end
