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
  return function (dispatch) {
    dispatch(requestGeolocation());
    return navigator.geolocation.getCurrentPosition((position) => {
      dispatch(recieveGeolocation(position.coords.latitude, position.coords.longitude));
    }, (error) => {
      $.get('http://freegeoip.net/json/', (results) => {
        console.log(results);
        dispatch(recieveGeolocation(results.latitude, results.longitude));
      });
    });
  }
}

export function requestRestaurants() {
  return { type: 'REQUEST_RESTAURANTS' };
}

export function recieveRestaurants(results) {
  console.log('rR', results);
  return {
    type: 'RECIEVE_RESTAURANTS',
    results
  };
}

export function fetchRestaurants(params) {
  return function (dispatch) {
    dispatch(requestRestaurants());
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
        console.log('results:', results.responseJSON);
        dispatch(recieveRestaurants(results.responseJSON));
      }
    });

    // dispatch(requestGeolocation());
    // return navigator.geolocation.getCurrentPosition((position) => {
    //   dispatch(recieveGeolocation(position.coords.latitude, position.coords.longitude));
    // }, (error) => {
    //   $.get('http://freegeoip.net/json/', (results) => {
    //     console.log(results);
    //     dispatch(recieveGeolocation(results.latitude, results.longitude));
    //   });
    // });
  }
}