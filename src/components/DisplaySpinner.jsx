import React from 'react';

export default function DisplaySpinner(props) {
  let spinner;
  if (Object.keys(props.display).length === 0) {
    spinner = (
      <div className='spinner' style={{ visibility: props.isFetching ? 'visible' : 'hidden' }}></div>
    )
  }
  return (
    <div>
      { spinner }
    </div>
  )
}