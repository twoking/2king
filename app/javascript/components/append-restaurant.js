import haversine from "haversine"

const restaurantCard = (resto) => {
  const openNow = ""
  let distance = new Number;
  console.log(resto);
  const priceRange = resto.price_range ? "$".repeat(resto.price_range) : ""
  if (resto.opening_hours){
    const openNow = resto.opening_hours.open_now ? "OPEN" :  "CLOSED"
  }
  const mylat = localStorage.getItem('lat');
  const mylng = localStorage.getItem('lng');
  const picture = resto.cover_picture
  return (`
  <a class="mx-2 restaurant-card-link" href="/restaurant?id=${resto.R.res_id}">
    <div class="card-product">
      <img src="${picture}">
        <div class="card-product-infos">
          <h2>${resto.name}</h2>
          <p>${resto.location.address}</p>
          <p>${resto.establishment} | ${resto.cuisines}</p>
          <p>${resto.distance_from_me}Km away ${openNow}</p>
          <p>${priceRange}</p>
        </div>
    </div>
    </a>`)
}

const appendRestaurant = (result) =>{
  const searchBox = document.querySelector("#search-results")
  searchBox.insertAdjacentHTML("beforeend", restaurantCard(result))
}

export { appendRestaurant }
