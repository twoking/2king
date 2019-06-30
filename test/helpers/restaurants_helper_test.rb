require 'test_helper'

class RestaurantsHelperTest < ActionView::TestCase
  test "location mapper helper" do
    resto_1 = restaurants(:resto_1)
    resto_2 = restaurants(:resto_2)
    resto_3 = restaurants(:resto_3)
    restos_arr = [resto_1, resto_2]

    assert restaurant_mapper(restos_arr).include? [resto_1.latitude, resto_1.longitude, resto_1.name]
    assert restaurant_mapper(restos_arr).include? [resto_2.latitude, resto_2.longitude, resto_2.name]
    assert_not restaurant_mapper(restos_arr).include? [resto_3.latitude, resto_3.longitude, resto_3.name]
  end
end
