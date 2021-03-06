//import { listRestaurantsNearBy } from "components/restaurants-nearby.js"
import { listRestaurants } from "components/restaurants-nearby";
import { searchRestaurant } from "components/restaurant-search";
import { fetchRestaurantsNearBy } from "components/restaurants-nearby";
import "dom";
import "bootstrap";

const indexPage = document.querySelector("#search_restaurant");
indexPage && listRestaurants();
indexPage && searchRestaurant();
indexPage && fetchRestaurantsNearBy();
