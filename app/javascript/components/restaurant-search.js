import { appendRestaurant } from "./append-restaurant.js"
import haversine from "haversine"


const searchRestaurant = () => {
  const input = document.querySelector("#search_restaurant")
  const autocomplete = new google.maps.places.Autocomplete(input,{ types: ['establishment']});
  autocomplete.addListener('place_changed', () => {
   var resto = autocomplete.getPlace();
   const mylat = localStorage.getItem('lat');
   const mylng = localStorage.getItem('lng');
   const start = {
     latitude: mylat,
     longitude: mylng
   };
   resto.latitude =  resto.geometry.location.lat()
   resto.longitude =  resto.geometry.location.lng()
   const end = {
     latitude: resto.latitude,
     longitude: resto.longitude
   }
   resto.distance_from_me = parseFloat(haversine(start, end).toFixed(2))
   resto.cover_picture = (resto.photos !== undefined) ? resto.photos[0].getUrl([200, 200]) : picture = resto.icon
   localStorage.setItem('restaurants', JSON.stringify([resto]))
   document.querySelector("#search-results").innerHTML = ""
   document.querySelector("#search-title").innerText = "Search Result"
   appendRestaurant(resto)
  })
}











export { searchRestaurant }

// // Trigger the rails controller Restaurants#update_search
// const fetchUrl = (lat, lng, name = "") => {
//     // Default options are marked with *
//     const datacoordinates = `coordinates[lat]=${lat}&coordinates[lng]=${lng}`
//     Rails.ajax({
//       type: "Get",
//       url: "/restaurants/search_nearby",
//       data: datacoordinates,
//     })
// }

// Automatically
