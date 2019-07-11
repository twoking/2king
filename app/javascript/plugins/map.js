const images = require.context('../images', true);
const imagePath = (name) => images(name, true)

let map;
let markers = [];

const addMarker = ({lat, lng}, isResto = true) => {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    icon: imagePath('./blue-dot.png')
  });

  if(isResto) {
    marker.icon = imagePath('./crown.png');
  }

  markers.push(marker);
}

// delete all markers minus the current user position marker
const deleteMarkers = () => {
  clearMarkers();
  markers = [markers[0]];
}

const clearMarkers = () => {
  setMapOnAll(null);
}

const setMapOnAll = (map) => {
  markers.slice(1).forEach(marker => {
    marker.setMap(map);
  })
}

const initMap = (lat, lng, zoom = 15) => {
  const myCoords = new google.maps.LatLng(lat, lng);
  const mapOptions = {
    disableDefaultUI: true,
    center: myCoords,
    zoom
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  const currentPosition = {
    lat: myCoords.lat(),
    lng: myCoords.lng()
  }
  addMarker(currentPosition, false);

  if (gon.markers.length) {
    gon.markers.forEach((marker) => {
      addMarker(marker);
    });
  }

  setMapOnAll(map)
}

export { initMap, setMapOnAll, deleteMarkers, addMarker, map, markers}
