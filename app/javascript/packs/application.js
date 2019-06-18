
//Get current Location and store it
getCurrentLocation = (callback) => {
   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        localStorage.setItem('lat', `${position.coords.latitude}`);
        localStorage.setItem('lng', `${position.coords.longitude}`);
        callback()
       });
    }
    else {
       throw new Error("Your browser does not support geolocation.");
    }
}

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

var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.8902, 151.1759));
defaultBounds.extend(new google.maps.LatLng(-60.8474, 200.2631));


const restaurantCard = (resto) => {
  console.log(resto);
  let picture = new String ;
  if (resto.photos !== undefined) {
     picture = resto.photos[0].getUrl([200, 200])
     console.log(picture);
  } else {
     picture = resto.icon
  }
  return (`<a href="/restaurant?id=${resto.place_id}"><div class="card-product">
    <img src="${picture}">
    <div class="card-product-infos">
      <h2>${resto.name}</h2>
      <p>${resto.vicinity}</p>
    </div>
  </div>`)
}


const appendRestaurant = (result) =>{
  const searchBox = document.querySelector("#search-results")
  searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
}


const input = document.querySelector("#search_restaurant")
autocomplete = new google.maps.places.Autocomplete(input,{ types: ['establishment']});
autocomplete.addListener('place_changed', () => {
 var place = autocomplete.getPlace();
 document.querySelector("#search-results").innerHTML = ""
 appendRestaurant(place)
})



const getRestaurants = (lat, lng, name = "") => {
  document.querySelector("#search-results").innerHTML = ""
  var request = {
    location: new google.maps.LatLng(lat,lng),
    radius: "1500",
    type: ['restaurant'],
    query: name,
    rankby: "distance"
  };
  var service = new google.maps.places.PlacesService(document.createElement('div'));

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((result) =>{
          appendRestaurant(result)
        })
      }
    });
}



getCurrentLocation(() => {
  lat = localStorage.getItem('lat');
  lng = localStorage.getItem('lng');
  //getRestaurants(lat, lng)
});
