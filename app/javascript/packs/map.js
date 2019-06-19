const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const success = (pos) => {
  const {latitude, longitude} = pos.coords;
  initMap(latitude, longitude)
}

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const domLoaded = () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
}

const initMap = (lat, lng, zoom = 17) => {
  const myCoords = new google.maps.LatLng(lat, lng);
  const mapOptions = {
    center: myCoords,
    zoom
  };
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const marker = new google.maps.Marker({
    position: myCoords,
    map: map
  });
}

document.addEventListener("DOMContentLoaded", domLoaded);
