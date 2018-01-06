import React from 'react';

export default function DisplayBanner(props) {
  return (
    <div className='banner'>
      <div className='bannerInner'>
        <h2 className='title' onClick={props.searchAgain} >eatnear.me</h2>
        <button style={{ visibility: Object.keys(props.display).length === 0 ? 'hidden' : 'visible' }} onClick={event => props.newRestaurant(event)} className='chooseAnother'>Choose another</button>
      </div>
    </div>
  )
}