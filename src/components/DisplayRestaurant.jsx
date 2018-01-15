import React from 'react';

export default function DisplayRestaurant(props) {
  let mapsiframe = `https://www.google.com/maps/embed/v1/place?key=&zoom=15&q=place_id:${props.display}`
  let restuarant;
  if (Object.keys(props.display).length !== 0) {
    restuarant = (
      <iframe src={mapsiframe} frameBorder='0' id='mapsiframe'></iframe>
    )
  }

  return (
    <div>
      {restuarant}
      <div id='googleMapsAttributions'></div>
    </div>
  )
}