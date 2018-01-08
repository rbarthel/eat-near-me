import React from 'react';

export default function DisplaySpinner(props) {
  let spinner;
  if (Object.keys(props.display).length === 0) {
    spinner = (
      <div className='spinner' style={{ display: props.isFetching ? 'block' : 'none' }}></div>
    )
  }

  return (
    <div className='spinnerContainer'>
      { spinner }
    </div>
  )
}