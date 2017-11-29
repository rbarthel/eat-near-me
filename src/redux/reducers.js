import { combineReducers } from 'redux';

function params(
  state = {
    waitingForGeolocation: false,
    locationIsFetching: false,
    location: [],
    radius: '5',
    minPrice: '0',
    maxPrice: '0',
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
    case 'WAITING_FOR_GEOLOCATION':
      return Object.assign({}, state, {
        ...state.params,
        waitingForGeolocation: true
      })
    case 'NOT_WAITING_FOR_GEOLOCATION':
      return Object.assign({}, state, {
        ...state.params,
        waitingForGeolocation: false
      })
    case 'REQUEST_GEOLOCATION':
      return Object.assign({}, state, {
        ...state.params,
        locationIsFetching: true
      })
    case 'RECIEVE_GEOLOCATION':
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
    restaurants: [],
    display: {}
  },
  action
) {
  switch(action.type) {
    case 'REQUEST_RESTAURANTS':
      return Object.assign({}, state, {
        ...state.results,
        isFetching: true
      })
    case 'RECIEVE_RESTAURANTS':
      return Object.assign({}, state, {
        ...state.results,
        restaurants: action.results
      })
    case 'DISPLAY_RESTAURANT':
      return Object.assign({}, state, {
        ...state.results,
        isFetching: false,
        display: action.restaurant
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({ params, results });

export default rootReducer;