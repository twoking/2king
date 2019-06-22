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


