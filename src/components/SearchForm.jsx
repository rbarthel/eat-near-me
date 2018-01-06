import React from 'react';

export default function SearchForm(props) {
  let searchForm;
  if (Object.keys(props.results.display).length === 0) {
    searchForm = (
      <form onSubmit={event => props.handleSubmit(event)} className='searchForm'>
        <button className='mainButtons' id='submit' disabled={props.results.isFetching}>Find me a restaurant</button>&nbsp;
        <button className='mainButtons' onClick={event => props.toggleOptions(event, props.params)}>Options ▼</button>
        <div style={{ display: props.params.displayOptions ? 'block' : 'none'}} className='displayOptions'>
          <span id='location'>
            <button id='getLocation' disabled={props.params.locationDisabled} onClick={event => props.getLocation(event)}>Get my location</button>
            &nbsp;or&nbsp;
            <input className='textField' id='searchTextField' placeholder={props.params.autocompletePlaceholder} type='text'></input>
          </span>
          <label htmlFor='radius'>How far are you willing to go?</label>&nbsp;
          <input id='radius' type='range' min='1' max='50' value={props.params.radius} onChange={event => props.onParamsChange(event.target, props.params)}></input>
          {props.params.radius} km
          <br />
          &nbsp;<label htmlFor='minPrice'>Minimum Price</label>&nbsp;
          <input id='minPrice' type='range' min='0' max='4' value={props.params.minPrice} onChange={event => props.onParamsChange(event.target, props.params)}></input>
          &nbsp;{'$'.repeat(props.params.minPrice)}<span className='hidden'>{'$'.repeat(4 - props.params.minPrice)}</span>
          <br />
          <label htmlFor='maxPrice'>Maximum Price</label>&nbsp;
          <input id='maxPrice' type='range' min='0' max='4' value={props.params.maxPrice} onChange={event => props.onParamsChange(event.target, props.params)}></input>
          &nbsp;{'$'.repeat(props.params.maxPrice)}<span className='hidden'>{'$'.repeat(4 - props.params.maxPrice)}</span>
          <br />
          <label htmlFor='keyword'>Type of restaurant (optional)</label>&nbsp;
          <input className='textField' id='keyword' placeholder="eg. 'pizza'" value={props.params.keyword} onChange={event => props.onParamsChange(event.target, props.params)}></input>
          <br />
          <label htmlFor='openNow'>Only show places open now</label>&nbsp;
          <input id='openNow' type='checkbox' checked={props.params.openNow} onChange={event => props.onParamsChange(event.target, props.params)}></input>
        </div>
      </form>
    )
  }

  return (
    <div>
      { searchForm }
    </div>
  )
}