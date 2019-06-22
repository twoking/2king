//import { listRestaurantsNearBy } from "components/restaurants-nearby.js"
import { listRestaurants } from "components/restaurants-nearby.js"
import { searchRestaurant } from "components/restaurant-search.js"
import "bootstrap";


const indexPage = document.querySelector("#search_restaurant")
indexPage && listRestaurants()
indexPage && searchRestaurant()

const mainPanel = $('.main-panel');
const panelToggler = $('.toggle-panel');

panelToggler.on('click', function(e) {
  e.preventDefault();
  mainPanel.toggle();
});

const restaurantFilter = $('.restaurant-filter');

restaurantFilter.on('change', function(e) {
  const degreesFilter = [];
  const ownList = true;
  $.each($(".restaurant-filter:checked"), function(){
    degreesFilter.push($(this).val());
  });

  console.log(degreesFilter);
  console.log(ownList);

  const payload = {
    degreesFilter,
    ownList
  }

  $.get('/restaurants-filter', payload, function(data) {
    console.log('success');
  });
});


