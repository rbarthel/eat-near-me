import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseRestaurant } from '../redux/actions';
import DisplayRestaurant from '../components/DisplayRestaurant.jsx';
import NoResults from '../components/NoResults.jsx';

const mapStateToProps = state => {
  return state.results;
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
      <div>
        <NoResults display={ this.props.noResults }/>
        <DisplayRestaurant { ...this.props } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
