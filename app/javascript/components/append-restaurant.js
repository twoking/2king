import haversine from "haversine"

const restaurantCard = (resto) => {
  let isOpen = ""
  const priceRange = resto.price_level ? "$".repeat(resto.price_level) : ""
  if (resto.opening_hours){
    isOpen = resto.opening_hours.open_now ? "OPEN" : "CLOSE"
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
  return(
    `<a href="/restaurants/${resto.place_id}">
    <div class="card-product my-2">
      <img src="${picture}">
      <div class="card-product-infos">
        <h2>${resto.name}</h2>
        <p class="my-1">${haversine(start, end).toFixed(2)}Km away ${isOpen}</p>
        <div class="d-flex">
          <p class="my-0">${priceRange}</</p>
        </div>
      </div>
    </div>
  </a>`

  )
}


const appendRestaurant = (result) =>{
  const searchBox = document.querySelector("#search-results")
  searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
}

export { appendRestaurant }
