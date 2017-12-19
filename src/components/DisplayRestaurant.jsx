import React from 'react';

export default function DisplayRestaurant(props) {
  let displayPrice;
  if (props.display.price_level) {
    displayPrice = (
      <div>
        Price: {'$'.repeat(props.display.price_level)}
        <br />
      </div>
    )
  }
  let restuarant;
  if (Object.keys(props.display).length !== 0) {
    restuarant = (
      <div>
        <br />
        <button onClick={event => props.newRestaurant(event)}>Choose another</button>
        <br />
        {props.display.name}
        <br />
        {props.display.formatted_phone_number} <a href={props.display.website} target='_blank'>Website</a>
        <br />
        Rating: {props.display.rating} {'⭐ '.repeat(Math.round(props.display.rating))}
        <br />
        {displayPrice}
        Open Now: {props.display.opening_hours.open_now ? 'Yes' : 'No'}
        <br />
        <a href={props.display.url} target='_blank'>Directions</a>
        <br />
        {props.display.vicinity}

      </div>
    )
  }

  return (
    <div>
      {restuarant}
    </div>
  )
}