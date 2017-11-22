import { combineReducers } from 'redux';

function params(
  state = {
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
    restaurants: []
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
      console.log('action content', action.results);
      return Object.assign({}, state, {
        ...state.results,
        isFetching: false,
        restaurants: action.results
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({ params, results });

export default rootReducer;