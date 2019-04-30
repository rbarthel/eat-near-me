import React from 'react';

export default function DisplayRestaurant(props) {
  let mapsiframe = `https://www.google.com/maps/embed/v1/place?key=AIzaSyC7YcYi_OOWoLA2F4_m1no6vRWkwgQ1JK8&zoom=15&q=place_id:${props.display}`
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