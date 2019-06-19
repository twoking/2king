import { appendRestaurant } from "./append-restaurant.js"
import haversine from "haversine"

const getCurrentLocation = (callback) => {
  let newPosition = false
  let distance = 100
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      if (localStorage.getItem('lat')){
        let start = {latitude: parseFloat(localStorage.getItem('lat')), longitude: parseFloat(localStorage.getItem('lng'))}
        let end = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        distance = haversine(start, end)
        localStorage.setItem('lat', `${position.coords.latitude}`);
        localStorage.setItem('lng', `${position.coords.longitude}`);
      }
      if (distance > 0.5 ){
        console.log("new position");
        localStorage.setItem('lat', `${position.coords.latitude}`);
        localStorage.setItem('lng', `${position.coords.longitude}`);
        newPosition = true
      }
      callback(newPosition)
    });
  } else {
    throw new Error("Your browser does not support geolocation.");
  }
}



const getRestaurantsNearBy = (lat, lng, name = "") => {
  const mylat = localStorage.getItem('lat');
  const mylng = localStorage.getItem('lng');
  document.querySelector("#search-results").innerHTML = ""
  const url = `https://developers.zomato.com/api/v2.1/search?count=25&lat=${lat}&lon=${lng}&radius=1000&sort=real_distance&order=asc`
  fetch(url, {headers: { "user-key": "55b999fc85f2826feadca8e1d2a52a83" }})
  .then(response => response.json())
  .then((data) => {
    data.restaurants.forEach((result) => {
       let resto = result.restaurant;
       const start = { latitude: mylat, longitude: mylng };
       resto.latitude =  parseFloat(resto.location.latitude)
       resto.longitude =  parseFloat(resto.location.longitude)
       const end = { latitude: resto.latitude, longitude: resto.longitude }
       resto.distance_from_me = parseFloat(haversine(start, end).toFixed(2))
       resto.cover_picture = resto.featured_image
    });
    data.restaurants.sort((a, b) => { return a.restaurant.distance_from_me - b.restaurant.distance_from_me });
    localStorage.setItem('restaurants', JSON.stringify(data.restaurants))
    data.restaurants.forEach((result) => {
      appendRestaurant(result.restaurant)
    })

  });
}

const listRestaurants = () => {
  getCurrentLocation((newPosition) => {
     const lat = localStorage.getItem('lat');
     const lng = localStorage.getItem('lng');
     const restaurants = localStorage.getItem('restaurants');
     if (restaurants != null && !newPosition) {
      console.log("Displaying stored restos");
       JSON.parse(restaurants).forEach(resto => appendRestaurant(resto.restaurant))
     } else {
      console.log("New Search");
      getRestaurantsNearBy(lat, lng)
     }

   });
}

export {
  listRestaurants
}
