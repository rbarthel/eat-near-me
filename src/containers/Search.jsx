import React, { Component } from 'react';

import { connect } from 'react-redux';

import { handleParamsChange } from '../redux/search';

import SearchForm from '../components/SearchForm.jsx';

const mapStateToProps = state => {
  console.log('state:', state);
  return {
    params: state.params
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onParamsChange: (event) => {
      dispatch(handleParamsChange(event));
    }
  }
}

class Search extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // location: sessionStorage.lat !== undefined ? [Number(sessionStorage.lat), Number(sessionStorage.long)] : [],
  //     location: [],
  //     radius: '10',
  //     minPrice: '0',
  //     maxPrice: '4',
  //     keyword: '',
  //     openNow: false
  //   };
  //   // this.handleChange = this.handleChange.bind(this);
  //   // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const id = target.id;

  //   this.setState({
  //     [id]: value
  //   }, () => {
  //     if (Number(this.state.maxPrice) < Number(this.state.minPrice)) {
  //       this.setState({
  //         maxPrice: value,
  //         minPrice: value
  //       });
  //     }
  //   });
  // }

  // handleSubmit(event) {
  //   console.log(this.state);
  //   event.preventDefault();
  // }

  // componentWillReceiveProps(newProps){
  //   console.log('newProps', newProps);
  //   this.setState({
  //     params: this.props.params
  //   });
  // }

  render() {
    return (
      <SearchForm { ...this.props } />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
