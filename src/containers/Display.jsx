import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseRestaurant } from '../redux/actions';
import DisplayRestaurant from '../components/DisplayRestaurant.jsx';

const mapStateToProps = state => {
  return {
    display: state.results.display
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newRestaurant: (event) => {
      event.preventDefault();
      dispatch(chooseRestaurant());
    }
  }
}

class Display extends Component {

  render() {
    return (
      <DisplayRestaurant { ...this.props } />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
