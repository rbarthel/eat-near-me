$(function () {

  let location;

  // if location is already set in session storage
  if (sessionStorage.lat !== undefined) {
    $('#location').hide();
    location = [Number(sessionStorage.lat), Number(sessionStorage.long)];
  };

  // poll the html5 location api when user clicks get location
  $('#getLocation').on('click', (event) => {
    event.preventDefault();
    getLocation().then(() => {
      $('#submit').removeAttr('disabled');
    })
  });

  // set the location in local session storage
  function setLocation(lat, long) {
    location = [Number(lat),  Number(long)];
    sessionStorage.lat = lat;
    sessionStorage.long = long;
  }

  // get location via google places autocomplete
  // function googleLocation() {
  //   const place = autocomplete.getPlace();
  //   const lat = place.geometry.location.lat();
  //   const long = place.geometry.location.lng();
  //   setLocation(lat, long);
  //   $('#location').hide();
  // };

  // set up google autocomplete listener
  // const input = document.getElementById('searchTextField');
  // const autocomplete = new google.maps.places.Autocomplete(input);
  // autocomplete.addListener('place_changed', googleLocation);

  // set the display for min or max price
  // function setDisplayPrice(price, minOrMax) {
  //   let priceSymbols = '';
  //   for (let i = 0; i < price; i++) {
  //     priceSymbols += '$';
  //   }
  //   $(`#display${minOrMax}Price`).text(priceSymbols);
  // }

  // handle min price slider change
  // $('#minPrice').change(() => {
  //   const minPrice = Number($('#minPrice').val());
  //   const maxPrice = Number($('#maxPrice').val());
  //   setDisplayPrice(minPrice, 'Min');
  //   if (maxPrice > 0 && maxPrice < minPrice) {
  //     $('#maxPrice').val(minPrice);
  //     setDisplayPrice(minPrice, 'Max');
  //   }
  // })

  // handle max price slider change
  // $('#maxPrice').change(() => {
  //   const minPrice = Number($('#minPrice').val());
  //   const maxPrice = Number($('#maxPrice').val());
  //   setDisplayPrice(maxPrice, 'Max');
  //   if (minPrice > 0 && minPrice > maxPrice) {
  //     $('#minPrice').val(maxPrice);
  //     setDisplayPrice(maxPrice, 'Min');
  //   }
  // })

  // handle radius slider change and set the display
  // $('#radius').change(() => {
  //   radiusVal = $('#radius').val() + ' km';
  //   $('#displayRadius').text(radiusVal);
  // })

  // get geo location
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (location) {
        resolve();
      } else {
        $('#submit').attr('disabled', true);
        $('#location').hide();
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation(lat, long);
          resolve();
        }, (error) => {
          $.get('http://freegeoip.net/json/', (results) => {
            setLocation(results.latitude, results.longitude);
            resolve();
          });
        });
      };
    })
  }

  // handler for submit
  $('#submit').on('click', (event) => {
    $('#submit').attr('disabled', true);
    event.preventDefault();
    getLocation().then(() => {
      const params = {
        location: location,
        openNow: $('#openNow').is(':checked'),
        keyword: $('#keyword').val(),
        radius: $('#radius').val() * 1000,
        minPriceLevel: Number($('#minPrice').val()),
        maxPriceLevel: Number($('#maxPrice').val())
      };
      console.log('params:', params);
      $.ajax({
        url: 'http://localhost:8080/search',
        type: 'POST',
        data: JSON.stringify(params),
        contentType: 'application/json',
        complete: (results) => {
          console.log('results:', results.responseJSON);
        }
      });
    });
  });
});