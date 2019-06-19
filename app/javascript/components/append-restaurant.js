import haversine from "haversine"

const restaurantCard = (resto) => {
  const openNow = ""
  let distance = new Number;
  console.log(resto);
  const priceRange = resto.price_level ? "$".repeat(resto.price_level) : ""
  if (resto.opening_hours){
    const openNow = resto.opening_hours.open_now ? "OPEN" :  "CLOSED"
  }
  const mylat = localStorage.getItem('lat');
  const mylng = localStorage.getItem('lng');
  const start = { latitude: mylat, longitude: mylng };
  const end = { latitude: resto.latitude, longitude: resto.longitude};
  const picture = resto.cover_picture
  if (resto.cover_picture == undefined){
    const picture = resto.photos ? resto.photos[0].getUrl([200, 200]) : resto.icon
  }
  if (resto.latitude == undefined){
    const end = { latitude: resto.geometry.location.lat(), longitude: resto.geometry.location.lng()}
  }
  return (`<a class="mx-2 restaurant-card-link" href="/restaurant?id=${resto.place_id}"><div class="card-product">
    <img src="${picture}">
    <div class="card-product-infos">
      <h2>${resto.name}</h2>
      <p>${resto.vicinity}</p>
      <p>${haversine(start, end).toFixed(2)}Km away ${openNow}</p>
      <p>${priceRange}</p>
    </div>
  </div>`)
}

const appendRestaurant = (result) =>{
  const searchBox = document.querySelector("#search-results")
  searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
}

export { appendRestaurant }
