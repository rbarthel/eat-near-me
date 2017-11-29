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
    dispatch(recieveGeolocation(lat, lng));
    if (getState().params.waitingForGeolocation) {
      dispatch(notWaitingForGeolocation());
      dispatch(fetchRestaurants());
    }
  }
}

export function recieveGeolocation(lat, lng) {
  const content = {
    lat: lat,
    lng: lng
  }
  return {
    type: 'RECIEVE_GEOLOCATION',
    content
  };
}

export function getLocationAutocomplete(place) {
  const content = {
    id: 'location',
    value: [
      place.geometry.location.lat(),
      place.geometry.location.lng()
    ]
  };
  return {
    type: 'UPDATE_PARAMS',
    content
  };
}

export function fetchGeolocation() {
  return (dispatch) => {
    dispatch(requestGeolocation());
    return navigator.geolocation.getCurrentPosition((position) => {
      dispatch(recieveGeolocationTrigger(position.coords.latitude, position.coords.longitude));
    }, (error) => {
      $.get('http://freegeoip.net/json/', (results) => {
        dispatch(recieveGeolocationTrigger(results.latitude, results.longitude));
      });
    });
  }
}

export function displayRestaurant(restaurant) {
  return {
    type: 'DISPLAY_RESTAURANT',
    restaurant
  };
}

export function chooseRestaurant() {
  return (dispatch, getState) => {
    const max = getState().results.restaurants.length;
    const chosen = Math.floor(Math.random() * (max - 0)) + 0;
    const place_id = getState().results.restaurants[chosen].place_id;
    $.ajax({
      url: 'http://localhost:8080/details',
      type: 'POST',
      data: JSON.stringify({place_id: place_id}),
      contentType: 'application/json',
      complete: (results) => {
        dispatch(displayRestaurant(results.responseJSON));
      }
    });
  }
}

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
    dispatch(requestRestaurants());
    const params = getState().params;
    const options = {
      location: params.location,
      openNow: params.openNow,
      keyword: params.keyword,
      radius: params.radius,
      minPriceLevel: params.minPrice,
      maxPriceLevel: params.maxPrice
    };
    $.ajax({
      url: 'http://localhost:8080/search',
      type: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json',
      complete: (results) => {
        dispatch(recieveRestaurants(results.responseJSON));
        dispatch(chooseRestaurant());
      }
    });
  }
}