import { combineReducers } from 'redux';

function params(
  state = {
    locationIsFetching: false,
    location: [],
    radius: '10',
    minPrice: '0',
    maxPrice: '4',
    keyword: '',
    openNow: true
  },
  action
) {
  switch(action.type) {
    case 'UPDATE_PARAMS':
      const target = action.content;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      return Object.assign({}, state, {
        ...state.params,
        [target.id]: value
      })
    case 'REQUEST_GEOLOCATION':
      return Object.assign({}, state, {
        ...state.params,
        locationIsFetching: true
      })
    case 'RECIEVE_GEOLOCATION':
      console.log(action.content);
      return Object.assign({}, state, {
        ...state.params,
        locationIsFetching: false,
        location: [action.content.lat, action.content.lng]
      })
    default:
      return state;
  }
}

function results(
  state = {
    isFetching: false,
    results: []
  },
  action
) {
  switch(action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({ params });

export default rootReducer;