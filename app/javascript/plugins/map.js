import { intersection } from "lodash"
let map;
let markers = [];

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

const addMarker = ([lat, lng]) => {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map
  });
  markers.push(marker);
}

// only delete all markers minus the current user position marker
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
  addMarker([myCoords.lat(), myCoords.lng()]);

  if (gon.markers.length) {
    gon.markers.forEach((marker) => {
      addMarker(marker);
    });
  }

  setMapOnAll(map)
}

const initPlugin = () => {
  $(function() {
    domLoaded();

    const restaurantFilter = $('.restaurant-filter');

    restaurantFilter.on('change', function(e) {
      const degreesFilter = [];
      let ownList = false;

      $.each($(".restaurant-filter:checked"), function(){
        if($(this).hasClass('user-filter')) {
          ownList = $(this).prop('checked');
        } else {
          degreesFilter.push($(this).val());
        }
      });

      const payload = {
        degreesFilter,
        ownList
      }

      deleteMarkers();
      $.get('/restaurants-filter.json', payload, function(dataMarkers) {
        dataMarkers.forEach(marker => {
          addMarker(marker);
        })
        setMapOnAll(map);
      });
    });
  });
}

export { initPlugin }
