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

export function fetchGeolocation(subreddit) {
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
    // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    //   .then(
    //     response => response.json(),
    //     error => console.log('try other location api')
    //   )
    //   .then(json =>
    //     dispatch(recieveGeolocation(subreddit, json))
    //   )
  }
}