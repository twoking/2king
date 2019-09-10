import haversine from "haversine"

const restaurantCard = (resto) => {
  const restaurant = resto.restaurant || resto
  const openNow = ""
  let distance = new Number;
  const priceRange = restaurant.price_range ? "$".repeat(restaurant.price_range) : ""
  if (restaurant.opening_hours){
    const openNow = restaurant.opening_hours.open_now ? "OPEN" :  "CLOSED"
  }
  const mylat = localStorage.getItem('lat');
  const mylng = localStorage.getItem('lng');
  const start = { latitude: mylat, longitude: mylng };
  const end = { latitude: restaurant.latitude, longitude: restaurant.longitude};  
  let dist = haversine(start, end).toFixed(2)
  dist = dist.toString()[0] == "0" ? `${dist * 1000}m from you` : `${dist}Km from you`;
  const picture = restaurant.thumb || ""
  return (  `<a href="/restaurant?id=${restaurant.R.res_id}">
  <div class="card-product my-2">
    <img src="${picture}">
    <div class="card-product-infos">
      <h2>${restaurant.name}</h2>
      <p class="my-1">${dist}</p>
      <p class="my-0 mr-1">${priceRange}</p>
    </div>
  </div>
</a>`)
}

const appendRestaurant = (result) =>{
  const searchBox = document.querySelector("#search-results")
  searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
}

export { appendRestaurant }
// import haversine from "haversine"

// const restaurantCard = (resto) => {
//   let isOpen = ""
//   const priceRange = resto.price_level ? "$".repeat(resto.price_level) : ""
//   if (resto.opening_hours){
//     isOpen = resto.opening_hours.open_now ? "OPEN" : "CLOSE"
//   }
//   const mylat = localStorage.getItem('lat');
//   const mylng = localStorage.getItem('lng');
//   const start = { latitude: mylat, longitude: mylng };
//   const end = { latitude: resto.latitude, longitude: resto.longitude};
//   const picture = resto.cover_picture
//   if (resto.cover_picture == undefined){
//     const picture = resto.photos ? resto.photos[0].getUrl([200, 200]) : resto.icon
//   }
//   if (resto.latitude == undefined){
//     const end = { latitude: resto.geometry.location.lat(), longitude: resto.geometry.location.lng()}
//   }
//   return(
//     `<a href="/restaurants/${resto.place_id}">
//     <div class="card-product my-2">
//       <img src="${picture}">
//       <div class="card-product-infos">
//         <h2>${resto.name}</h2>
//         <p class="my-1">${haversine(start, end).toFixed(2)}Km away ${isOpen}</p>
//         <p class="my-0 mr-1">${isOpen} | ${priceRange}</p>
//       </div>
//     </div>
//   </a>`

//   )
// }




// const appendRestaurant = (result) =>{
//   const searchBox = document.querySelector("#search-results")
//   searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
// }

// export { appendRestaurant }
