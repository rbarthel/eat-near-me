// import fetch from 'cross-fetch' //fetch polyfill for IE and android browser

export function handleParamsChange(content) {
  return {
    type: 'UPDATE_PARAMS',
    content
  };
}

export function requestGeolocation() {
  return { type: 'REQUEST_GEOLOCATION' };
}

export function waitingForGeolocation() {
  return { type: 'WAITING_FOR_GEOLOCATION' };
}

export function notWaitingForGeolocation() {
  return { type: 'NOT_WAITING_FOR_GEOLOCATION' };
}

export function recieveGeolocationTrigger(lat, lng) {
  return (dispatch, getState) => {
    dispatch(recieveGeolocation(lat, lng, true));
    if (getState().params.waitingForGeolocation) {
      dispatch(notWaitingForGeolocation());
      dispatch(fetchRestaurants());
    }
  }
}

export function recieveGeolocation(lat, lng, locationDisabled) {
  const content = {
    lat: lat,
    lng: lng,
    locationDisabled: locationDisabled
  }
  return {
    type: 'RECIEVE_GEOLOCATION',
    content
  };
}

export function getLocationAutocomplete(place) {
  return (dispatch) => {
    dispatch(recieveGeolocation(place.geometry.location.lat(), place.geometry.location.lng(), false));
  }
}

export function fetchGeolocation() {
  return (dispatch) => {
    dispatch(requestGeolocation());
    return navigator.geolocation.getCurrentPosition((position) => {
      dispatch(recieveGeolocationTrigger(position.coords.latitude, position.coords.longitude));
    }, (error) => {
      console.log('Geolocation error, falling back to IP location.');
      // $.get('http://freegeoip.net/json/', (results) => {
      //   dispatch(recieveGeolocationTrigger(results.latitude, results.longitude));
      // });

      const request = new XMLHttpRequest();
      request.open('GET', 'http://freegeoip.net/json/', true);
      request.onload = function() {
        const results = JSON.parse(this.response);
        dispatch(recieveGeolocationTrigger(results.latitude, results.longitude));
      }
      request.onerror = function() {
        console.log('IP location failed. Please enable geolocation or manually input a location.');
      };
      request.send();

    });
  }
}

export function displayRestaurant(restaurant) {
  return {
    type: 'DISPLAY_RESTAURANT',
    restaurant
  };
}

export function noResults() {
  return { type: 'NO_RESULTS' };
}

export function searchAgain() {
  return { type: 'SEARCH_AGAIN' };
}

// export function chooseRestaurant() {
//   return (dispatch, getState) => {
//     const max = getState().results.restaurants.length;
//     if (max === 0) {
//       dispatch(noResults());
//     } else {
//       const chosen = Math.floor(Math.random() * (max - 0)) + 0;
//       const place_id = getState().results.restaurants[chosen].place_id;
//       dispatch(displayRestaurant(place_id));
//     }
//   }
// }

export function chooseRestaurant() {
  return (dispatch, getState) => {
    const restaurants = getState().results.restaurants;
    const chosen = Math.floor(Math.random() * (restaurants.length));
    dispatch(displayRestaurant(restaurants[chosen].place_id));
  }
}

// export function chooseRestaurant() {
//   return (dispatch, getState) => {
//     const max = getState().results.restaurants.length;
//     if (max === 0) {
//       // dispatch(displayRestaurant({}));
//       dispatch(noResults());
//     } else {
//       const chosen = Math.floor(Math.random() * (max - 0)) + 0;
//       const place_id = getState().results.restaurants[chosen].place_id;
//       $.ajax({
//         url: 'http://localhost:8080/details',
//         type: 'POST',
//         data: JSON.stringify({place_id: place_id}),
//         contentType: 'application/json',
//         complete: (results) => {
//           dispatch(displayRestaurant(results.responseJSON));
//         }
//       });
//     }
//   }
// }

export function requestRestaurants() {
  return { type: 'REQUEST_RESTAURANTS' };
}

export function recieveRestaurants(results) {
  return {
    type: 'RECIEVE_RESTAURANTS',
    results
  };
}

export function fetchRestaurantsButton() {
  return (dispatch, getState) => {
    dispatch(requestRestaurants());
    const params = getState().params;
    if (params.locationIsFetching) {
      dispatch(waitingForGeolocation());
    } else if (params.location.length === 2) {
      dispatch(fetchRestaurants());
    } else {
      dispatch(waitingForGeolocation());
      dispatch(fetchGeolocation());
    }
  }
}

export function fetchRestaurants() {
  return (dispatch, getState) => {
    const params = getState().params;
    const request = {
      location: new google.maps.LatLng(params.location[0], params.location[1]),
      radius: params.radius * 1000,
      openNow: params.openNow,
      type: 'restaurant'
    };
    if (params.keyword) {
      request.name = params.keyword;
    };
    if (!(Number(params.minPrice) === 0 && Number(params.maxPrice) === 0)) {
      request.minPriceLevel = Number(params.minPrice);
      request.maxPriceLevel = Number(params.maxPrice);
    };

    const service = new google.maps.places.PlacesService(document.getElementById('googleMapsAttributions'));
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch(recieveRestaurants(results));
        dispatch(chooseRestaurant());
      } else {
        dispatch(noResults());
      }
    });
  }
}

// export function fetchRestaurants() {
//   return (dispatch, getState) => {
//     const params = getState().params;
//     const options = {
//       location: params.location,
//       openNow: params.openNow,
//       keyword: params.keyword,
//       radius: params.radius,
//       minPriceLevel: params.minPrice,
//       maxPriceLevel: params.maxPrice
//     };
//     $.ajax({
//       url: 'http://192.168.1.75:8080/search',
//       type: 'POST',
//       data: JSON.stringify(params),
//       contentType: 'application/json',
//       complete: (results) => {
//         // dispatch(handleParamsChange({id: 'displayOptions', value: false}));
//         dispatch(recieveRestaurants(results.responseJSON));
//         dispatch(chooseRestaurant());
//       }
//     });
//   }
// }