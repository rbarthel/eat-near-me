import React from 'react';

export default function DisplayRestaurant(props) {
  let mapsiframe = `https://www.google.com/maps/embed/v1/place?key=&zoom=15&q=place_id:${props.display}`
  let restuarant;
  if (Object.keys(props.display).length !== 0) {
    restuarant = (
      <div>
        <br />
        <button onClick={event => props.newRestaurant(event)}>Choose another</button>
        <br />
        <iframe src={mapsiframe} width='500' height='500'></iframe>
      </div>
    )
  }

  return (
    <div>
      {restuarant}
    </div>
  )
}