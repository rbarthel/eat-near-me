import React from 'react';

export default function NoResults(props) {
  let errorMessage;
  if (props.display) {
    errorMessage = (
      <p className='errorMessage'>No results found :(<br />Try setting min & max price to zero, or increase the distance.</p>
    )
  }

  return (
    <div>
      {errorMessage}
    </div>
  )
}