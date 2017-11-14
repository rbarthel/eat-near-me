export function handleParamsChange(content) {
  return {
    type: 'UPDATE_PARAMS',
    content
  }
}

export function getLocation(content) {
  return {
    type: 'UPDATE_PARAMS',
    content
  }
}

  // function getLocation() {
  //   return new Promise((resolve, reject) => {
  //     if (location) {
  //       resolve();
  //     } else {
  //       $('#submit').attr('disabled', true);
  //       $('#location').hide();
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const lat = position.coords.latitude;
  //         const long = position.coords.longitude;
  //         setLocation(lat, long);
  //         resolve();
  //       }, (error) => {
  //         $.get('http://freegeoip.net/json/', (results) => {
  //           setLocation(results.latitude, results.longitude);
  //           resolve();
  //         });
  //       });
  //     };
  //   })
  // }

export default (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_PARAMS':

      const target = action.content;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      return Object.assign({}, state, {
        params: {
          ...state.params,
          [target.id]: value
        }
      })

    default:
      return state;
  }
}