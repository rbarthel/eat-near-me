import React from 'react';

export default function SearchForm(props) {
  return (
    <form onSubmit={event => props.handleSubmit(event)}>
      <button id='submit' disabled={props.results.isFetching}>Find me a restaurant</button>&nbsp;
      <button onClick={event => props.toggleOptions(event, props.params)}>Options ⇩</button>
      <div style={{ display: props.params.displayOptions ? 'block' : 'none'}}>
        <span id='location'>
          <button id='getLocation' disabled={props.params.locationDisabled} onClick={event => props.getLocation(event)}>Get my location</button>
          &nbsp;or&nbsp;
          <input id='searchTextField' placeholder={props.params.autocompletePlaceholder} type='text' size='50'></input>
        </span>
        <br />
        <label htmlFor='radius'>How far are you willing to go?</label>
        <input id='radius' type='range' min='1' max='50' value={props.params.radius} onChange={event => props.onParamsChange(event.target, props.params)}></input>
        <span id='displayRadius'>{props.params.radius} km</span>
        <br />
        <label htmlFor='minPrice'>Minimum Price</label>
        <input id='minPrice' type='range' min='0' max='4' value={props.params.minPrice} onChange={event => props.onParamsChange(event.target, props.params)}></input>
        <span id='displayMinPrice'>{'$'.repeat(props.params.minPrice)}</span>
        <br />
        <label htmlFor='maxPrice'>Maximum Price</label>
        <input id='maxPrice' type='range' min='0' max='4' value={props.params.maxPrice} onChange={event => props.onParamsChange(event.target, props.params)}></input>
        <span id='displayMaxPrice'>{'$'.repeat(props.params.maxPrice)}</span>
        <br />
        <label htmlFor='keyword'>Type of restaurant (optional)</label>
        <input id='keyword' placeholder="eg. 'pizza'" value={props.params.keyword} onChange={event => props.onParamsChange(event.target, props.params)}></input>
        <br />
        <label htmlFor='openNow'>Only show places open now</label>
        <input id='openNow' type='checkbox' checked={props.params.openNow} onChange={event => props.onParamsChange(event.target, props.params)}></input>
      </div>
    </form>
  )
}