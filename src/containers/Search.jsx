import React, { Component } from 'react';

import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // location: sessionStorage.lat !== undefined ? [Number(sessionStorage.lat), Number(sessionStorage.long)] : [],
      location: [],
      radius: '10',
      minPrice: '0',
      maxPrice: '4',
      keyword: '',
      openNow: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;

    this.setState({
      [id]: value
    }, () => {
      if (Number(this.state.maxPrice) < Number(this.state.minPrice)) {
        this.setState({
          maxPrice: value,
          minPrice: value
        });
      }
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span id='location'>
          <button id='getLocation'>Get my location</button>
          or
          <input id='searchTextField' placeholder='Enter my location...' type='text' size='50'></input>
        </span>
        <br />
        <label htmlFor='radius'>How far are you willing to go?</label>
        <input id='radius' type='range' min='1' max='50' value={this.state.radius} onChange={this.handleChange}></input>
        <span id='displayRadius'>{this.state.radius} km</span>
        <br />
        <label htmlFor='minPrice'>Minimum Price</label>
        <input id='minPrice' type='range' min='0' max='4' value={this.state.minPrice} onChange={this.handleChange}></input>
        <span id='displayMinPrice'>{'$'.repeat(this.state.minPrice)}</span>
        <br />
        <label htmlFor='maxPrice'>Maximum Price</label>
        <input id='maxPrice' type='range' min='0' max='4' value={this.state.maxPrice} onChange={this.handleChange}></input>
        <span id='displayMaxPrice'>{'$'.repeat(this.state.maxPrice)}</span>
        <br />
        <label htmlFor='keyword'>Type of restaurant (optional)</label>
        <input id='keyword' placeholder="eg. 'pizza'" value={this.state.keyword} onChange={this.handleChange}></input>
        <br />
        <label htmlFor='openNow'>Only show places open now</label>
        <input id='openNow' type='checkbox' checked={this.state.openNow} onChange={this.handleChange}></input>
        <br />
        <button id='submit'>Find me a restaurant!</button>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
