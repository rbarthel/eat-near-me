import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseRestaurant } from '../redux/actions';
import DisplayRestaurant from '../components/DisplayRestaurant.jsx';
import NoResults from '../components/NoResults.jsx';
import WelcomeMessage from '../components/WelcomeMessage.jsx';

const mapStateToProps = state => {
  return state;
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
        <NoResults display={ this.props.results.noResults }/>
        <DisplayRestaurant { ...this.props.results } />
        <WelcomeMessage displayOptions={this.props.params.displayOptions} display={ !Object.keys(this.props.results.display).length && !this.props.results.noResults } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
