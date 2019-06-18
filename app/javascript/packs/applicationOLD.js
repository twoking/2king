const restaurantCard = (resto) => {
  console.log(resto);
  let picture = new String ;
  if (resto.photos !== undefined) {
     picture = resto.photos[0].getUrl([200, 200])
     console.log(picture);
  } else {
     picture = resto.icon
  }
  return (`<div><img src="${picture}" width="150" height="150"> <p>${resto.name}</p>
  </div>`)
}

`<div class="card-product">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/skateboard.jpg">
  <div class="card-product-infos">
    <h2>Product name</h2>
    <p>Product description with <strong>relevant info</strong> only.</p>
  </div>
</div>`


const appendRestaurant = (result) =>{
  const searchBox = document.querySelector("#search-results")
  searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
}



const getCurrentLocation = (callback) => {
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

getCurrentLocation(function(){
  lat = localStorage.getItem('lat');
  lng = localStorage.getItem('lng');
  getRestaurants(lat, lng)
});



const getRestaurants = (lat, lng, name = "") => {
  document.querySelector("#search-results").innerHTML = ""
  var request = {
    location: new google.maps.LatLng(lat,lng),
    radius: "1500",
    type: ['restaurant'],
    query: name,
    rankby: "distance",
    fields: "basics",
  };
  var service = new google.maps.places.PlacesService(document.createElement('div'));

  if (name == ""){
    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((result) =>{

          appendRestaurant(result)
        })
      }
    });
  } else {
    var request = {
      locationBias: { lat: parseFloat(lat), lng: parseFloat(lng) },
      query: name,
      fields: ['name', 'geometry', "photos", "formatted_address", "place_id", "price_level", "rating", "user_ratings_total"]
    };

    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        document.querySelector("#search-results").innerHTML = ""
        results.forEach((result) =>{
          appendRestaurant(result)
        })
      }
    });
  }
}

getRestaurants()
