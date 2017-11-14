import React, { Component } from 'react';

import { connect } from 'react-redux';

import { handleParamsChange } from '../redux/search';

import SearchForm from '../components/SearchForm.jsx';

const mapStateToProps = state => {
  return {
    params: state.params
  }
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
    }
  }
}

class Search extends Component {

  // handleSubmit(event) {
  //   console.log(this.state);
  //   event.preventDefault();
  // }

  render() {
    return (
      <SearchForm { ...this.props } />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
