//import { listRestaurantsNearBy } from "components/restaurants-nearby.js"
import { listRestaurants } from "components/restaurants-nearby.js"
import { searchRestaurant } from "components/restaurant-search.js"
import "bootstrap";


const indexPage = document.querySelector("#search_restaurant")
indexPage && listRestaurants()
indexPage && searchRestaurant()
