import { intersection } from "lodash"
import { initMap, setMapOnAll, deleteMarkers, addMarker, map, markers } from '../plugins/map'

$(function() {
  if($('#map')) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    initDegreeFilter();
    initFriendFilter();
  }
});

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

const initDegreeFilter = () => {
  const $restaurantFilter = $('.restaurant-filter');

  $restaurantFilter.on('change', function(e) {
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
}

const initFriendFilter = () => {
  const $friendFilter = $('.friend-filter')

  $friendFilter.on('change', function(e) {
    console.log('search friend');
  });
}
