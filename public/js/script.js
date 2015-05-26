var drawMap = function(markers) {

  L.mapbox.accessToken = 'pk.eyJ1IjoibWlzdHVoLXAiLCJhIjoiS2x2V290TSJ9.tIc-bqgkO1hUoY2gMABWaQ';
  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mistuh-p.lo03ah9l/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });
  var map = L.map('map').addLayer(mapboxTiles);
// could use the line below to set the map initially in case the user doesn't have geolocation enabled or available.
  map.setView([51.5286416,-0.1015987], 12);
// uses the current location of user logged in to display a map of their area
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      map.setView([position.coords.latitude, position.coords.longitude], 12);
    })
   }

   var markerLayer = L.mapbox.featureLayer();

    var updateMarkers = function(){

      //clears all markers
      map.removeLayer(markerLayer);
      markerLayer = L.mapbox.featureLayer();

      var showingItems=[];
      //get status of filter checkboxes
      $('.filter-checkbox:checked').each(function(item){


// pushes checked boxes into the showingItems array to be displayed on the map
          showingItems.push($(this).val())
        console.log(item)
       })

// filters the markers to only show the ones associated with checked boxes
      markers.filter(function(marker){
        return marker.instruments.filter(function(instrument){
          return showingItems.indexOf(instrument) > -1;
        }).length > 0;
      }).forEach(function(marker) {

// adds markers to map and includes user information
        var thisMarker = L.marker([marker.lat, marker.long], {
          icon: L.mapbox.marker.icon({
            'marker-size': 'large',
            'marker-symbol': 'music',
            'marker-color': '#fa0'
          })
        }).addTo(markerLayer).bindPopup("Name: "+marker.name+ "<br>" + "Plays: "+ marker.instruments.join(", ") +  "<br>" + "Bio: " + marker.bio +  "<br>" + "Email: " + marker.email)
      })
      markerLayer.addTo(map);
    }
    updateMarkers();


// update markers every time a check-box is changed
    $('.filter-checkbox').on('change',function(e){
      updateMarkers();
    });
}

