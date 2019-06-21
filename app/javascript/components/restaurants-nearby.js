import {
  appendRestaurant
} from "./append-restaurant.js"
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
      } else {
        localStorage.setItem('lat', `${position.coords.latitude}`);
        localStorage.setItem('lng', `${position.coords.longitude}`);
        newPosition = true
      }
      if (distance > 0.5 ){
        localStorage.setItem('lat', `${position.coords.latitude}`);
        localStorage.setItem('lng', `${position.coords.longitude}`);
        newPosition = true
      }
      callback(newPosition)
    });
  } else {
    console.log("klòkkòkl");
    throw new Error("Your browser does not support geolocation.");
  }
}



const getRestaurantsNearBy = (lat, lng, name = "") => {
  document.querySelector("#search-results").innerHTML = ""
  var request = {
    location: new google.maps.LatLng(lat, lng),
    radius: "1500",
    type: ['restaurant'],
    rankby: "distance"
  };
  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const mylat = localStorage.getItem('lat');
      const mylng = localStorage.getItem('lng');
      const start = {
        latitude: mylat,
        longitude: mylng
      };
      results.forEach((resto) => {
        resto.latitude =  resto.geometry.location.lat()
        resto.longitude =  resto.geometry.location.lng()
        const end = {
          latitude: resto.latitude,
          longitude: resto.longitude
        }
        resto.distance_from_me = parseFloat(haversine(start, end).toFixed(2))
        resto.cover_picture = (resto.photos !== undefined) ? resto.photos[0].getUrl([200, 200]) : resto.icon
      })
    };
    results.sort((a, b) => {
      return a.distance_from_me - b.distance_from_me
    });
    localStorage.setItem('restaurants', JSON.stringify(results))
    results.forEach((result) => {
      appendRestaurant(result)
    })
  })


}

const listRestaurants = () => {
  getCurrentLocation((newPosition) => {
    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants != null && !newPosition) {
      console.log("Displaying stored restos");
      JSON.parse(restaurants).forEach(resto => appendRestaurant(resto))
    } else {
      console.log("New Search");
      getRestaurantsNearBy(lat, lng)
    }
  });
}

export {
  listRestaurants
}
