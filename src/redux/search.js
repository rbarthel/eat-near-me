export function handleParamsChange(content) {
  return {
    type: 'UPDATE_PARAMS',
    content
  }
}

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

export default (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_PARAMS':

      const target = action.content;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      return Object.assign({}, state, {
        params: {
          ...state.params,
          [target.id]: value
        }
      })

    default:
      return state;
  }
}