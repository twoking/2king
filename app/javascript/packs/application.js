//import { listRestaurantsNearBy } from "components/restaurants-nearby.js"
import { listRestaurants } from "components/restaurants-nearby";
import { searchRestaurant } from "components/restaurant-search";
import { initPlugin } from "plugins/map";
import "dom";
import "bootstrap";

const indexPage = document.querySelector("#search_restaurant");
indexPage && listRestaurants();
indexPage && searchRestaurant();

$('#map') && initPlugin();


