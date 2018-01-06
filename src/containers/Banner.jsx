import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseRestaurant, searchAgain } from '../redux/actions';
import DisplayBanner from '../components/DisplayBanner.jsx';

const mapStateToProps = state => {
  return state.results;
}

const mapDispatchToProps = dispatch => {
  return {
    newRestaurant: (event) => {
      event.preventDefault();
      dispatch(chooseRestaurant());
    },
    searchAgain: (event) => {
      dispatch(searchAgain());
    }
  }
}

class Banner extends Component {
  render() {
    return (
      <DisplayBanner { ...this.props } />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
