import React from 'react';

export default function DisplayRestaurant(props) {
  let restuarant;
  if (Object.keys(props.display).length !== 0) {
    restuarant = (
      <div>
        <br />
        Name: {props.display.name}
        <br />
        {props.display.formatted_address}
        <br />
        {props.display.formatted_phone_number} <a href={props.display.website} target='_blank'>Website</a>
        <br />
        Rating: {props.display.rating} {'⭐ '.repeat(Math.round(props.display.rating))}
        <br />
        Open Now: {props.display.opening_hours.open_now ? 'Yes' : 'No'}
        <br />
        <button onClick={event => props.newRestaurant(event)}>Choose another</button>
      </div>
    )
  }

  return (
    <div>
      {restuarant}
    </div>
  )
}