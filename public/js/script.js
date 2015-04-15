var drawMap = function(markers) {

  L.mapbox.accessToken = 'pk.eyJ1IjoibWlzdHVoLXAiLCJhIjoiS2x2V290TSJ9.tIc-bqgkO1hUoY2gMABWaQ';
  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mistuh-p.lo03ah9l/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });
  var map = L.map('map').addLayer(mapboxTiles);
  // map.setView([51.5286416,-0.1015987], 12);

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
        // console.log(item.val())

console.log(showingItems)

          // showingItems.push($('.filter-checkbox:checked').val())
          showingItems.push($(this).val())
        console.log(item)


        //add checkbox value to showing items array
      })

        console.log(typeof $('.filter-checkbox:checked').val())

      markers.filter(function(marker){
        return marker.instruments.filter(function(instrument){
          return showingItems.indexOf(instrument) > -1;
        }).length > 0;
      }).forEach(function(marker) {

        // console.log("what is this?",marker);
        var thisMarker = L.marker([marker.lat, marker.long], {
          icon: L.mapbox.marker.icon({
            'marker-size': 'large',
            'marker-symbol': 'music',
            'marker-color': '#fa0'
          })
        }).addTo(markerLayer).bindPopup(marker.name +  "<br>" + marker.bio+ "<br>" + marker.instruments.join(", "))

        // mapMarkers.push({data:marker,marker:thisMarker});
      })


      markerLayer.addTo(map);

    }

    updateMarkers();


    //make this trigger on checkbox change
    $('.filter-checkbox').on('change',function(e){
      updateMarkers();
    });

}

