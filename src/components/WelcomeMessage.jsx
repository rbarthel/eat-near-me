import React from 'react';

export default function WelcomeMessage(props) {
  let message;
  if (props.display) {
    message = (
      <p>Don't know where to eat today?<br />Click on "Find me a restaurant" to get a recommendation!</p>
    )
  }

  return (
    <div className={ props.displayOptions ? 'welcomeMessage' : '' }>
      { message }
    </div>
  )
}