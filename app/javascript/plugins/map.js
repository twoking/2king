let map;

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

const initMap = (lat, lng, zoom = 15) => {
  const myCoords = new google.maps.LatLng(lat, lng);
  const mapOptions = {
    disableDefaultUI: true,
    center: myCoords,
    zoom
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  new google.maps.Marker({
    position: myCoords,
    map
  });

  if (gon.markers.length) {
    gon.markers.forEach(([lat, lng]) => {
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map
      });
    });
  }
}

const initPlugin = () => {
  domLoaded();
}

export { initPlugin, map }
