//import { listRestaurantsNearBy } from "components/restaurants-nearby.js"
import { listRestaurants } from "components/restaurants-nearby"
import { searchRestaurant } from "components/restaurant-search"
import { initPlugin } from "plugins/map"
import "bootstrap";


const indexPage = document.querySelector("#search_restaurant")
indexPage && listRestaurants()
indexPage && searchRestaurant()

$('#map') && initPlugin()

// TODO: put codes before on another file
const mainPanel = $('.main-panel');
const panelToggler = $('.toggle-panel');

panelToggler.on('click', function(e) {
  e.preventDefault();
  mainPanel.toggle();
});


