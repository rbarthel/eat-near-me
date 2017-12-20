import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseRestaurant } from '../redux/actions';
import DisplayRestaurant from '../components/DisplayRestaurant.jsx';
import NoResults from '../components/NoResults.jsx';
import WelcomeMessage from '../components/WelcomeMessage.jsx';

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
        <WelcomeMessage display={ !Object.keys(this.props.display).length && !this.props.noResults }/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
