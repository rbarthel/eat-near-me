$(function () {

  let location;

  // if location is already set in session storage
  if (sessionStorage.lat !== undefined) {
    $('#location').hide();
    location = [sessionStorage.lat, sessionStorage.long];
  };

  // poll the html5 location api
  $('#getLocation').on('click', (event) => {
    event.preventDefault();
    $('#getLocation').attr('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(Number(position.coords.latitude), Number(position.coords.longitude));
      $('#location').hide();
    }, (error) => {
      console.error(error);
      $('#getLocation').hide();
    });
  });

  // set the location in local session storage
  function setLocation(lat, long) {
    location = [lat, long];
    sessionStorage.lat = location[0];
    sessionStorage.long = location[1];
  }

  // get location via google places autocomplete
  function googleLocation() {
    const place = autocomplete.getPlace();
    setLocation(place.geometry.location.lat(), place.geometry.location.lng());
    $('#location').hide();
  };

  // set up google autocomplete listener
  const input = document.getElementById('searchTextField');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', googleLocation);

  function queryGoogle(params) {
    console.log(params);
  }

  $('#submit').on('click', (event) => {
    event.preventDefault();
    if (location !== undefined) {
      const params = {
        location: location,
        keyword: $('#keyword').val(),
        priceLower: $('#priceLower').val(),
        priceUpper: $('#priceUpper').val()
      };
      queryGoogle(params);
    }
  });

});