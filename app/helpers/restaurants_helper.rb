module RestaurantsHelper
  def location_mapper(array)
    array.map { |resto| [resto.latitude, resto.longitude, resto.name] }
  end
end
