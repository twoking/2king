//import { listRestaurantsNearBy } from "components/restaurants-nearby.js"
import { listRestaurants } from "components/restaurants-nearby"
import { searchRestaurant } from "components/restaurant-search"
import { initPlugin, map } from "plugins/map"
import "bootstrap";


const indexPage = document.querySelector("#search_restaurant")
indexPage && listRestaurants()
indexPage && searchRestaurant()

if($('#map')) {
  initPlugin();
}

// TODO: put codes before on another file

const mainPanel = $('.main-panel');
const panelToggler = $('.toggle-panel');

panelToggler.on('click', function(e) {
  e.preventDefault();
  mainPanel.toggle();
});

const restaurantFilter = $('.restaurant-filter, .user-filter');

restaurantFilter.on('change', function(e) {
  const degreesFilter = [];
  let ownList;

  $.each($(".restaurant-filter:checked"), function(){
    degreesFilter.push($(this).val());
  });

  if($(this).hasClass('user-filter')) {
    ownList = $(this).prop('checked');
  }

  // console.log(degreesFilter);
  // console.log(ownList);

  const payload = {
    degreesFilter,
    ownList
  }

  $.get('/restaurants-filter.json', payload, function(markers) {
    console.log(markers);
    console.log(map);
    markers.forEach(([lat, lng]) => {
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map
      });
    })
  });
});


