import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleParamsChange, getLocationAutocomplete, fetchGeolocation, fetchRestaurantsButton } from '../redux/actions';
import SearchForm from '../components/SearchForm.jsx';

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    onParamsChange: (event, params) => {
      dispatch(handleParamsChange(event));
      if (event.id === 'minPrice' && event.value > params.maxPrice) {
        dispatch(handleParamsChange({id: 'maxPrice', value: event.value}));
      }
      if (event.id === 'maxPrice' && event.value < params.minPrice) {
        dispatch(handleParamsChange({id: 'minPrice', value: event.value}));
      }
    },
    onAutocomplete: (place) => {
      dispatch(getLocationAutocomplete(place));
    },
    getLocation: (event) => {
      event.preventDefault();
      dispatch(fetchGeolocation());
    },
    handleSubmit: (event) => {
      event.preventDefault();
      dispatch(fetchRestaurantsButton());
    },
    toggleOptions: (event, params) => {
      event.preventDefault();
      dispatch(handleParamsChange({id: 'displayOptions', value: !params.displayOptions}))
    }
  }
}

class Search extends Component {

  componentDidMount() {
    const input = document.getElementById('searchTextField');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.props.onAutocomplete(place)
    });
  }

  render() {
    return (
      <SearchForm { ...this.props }/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
