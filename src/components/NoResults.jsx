import React from 'react';

export default function NoResults(props) {
  let errorMessage;
  if (props.display) {
    errorMessage = (
      <p className='errorMessage'>No results found :(</p>
    )
  }

  return (
    <div>
      {errorMessage}
    </div>
  )
}