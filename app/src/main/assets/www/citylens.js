function init() {
  var tileUrl = 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var tile_pt = 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=30a41d79c1184e6ba734df2aa9671c93';
  var tileOptions = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    subdomains: '1234'
  };

  var map = new L.Map('map', {
    center: [50.9794934, 11.3235439],
    zoom: 16,
    layers: [
      L.tileLayer(tileUrl, tileOptions)
    ]
  });

  var magnifyingGlass = L.magnifyingGlass({
    radius: 50,
    zoomOffset: 1,
    layers: [ L.tileLayer(tile_pt)],
    fixedPosition: false,
    latLng: [50.9794934, 11.3235439]
  });

  map.addLayer(magnifyingGlass);

  // make the glass disappear on click...
  magnifyingGlass.on('click', function() {
    map.removeLayer(magnifyingGlass);
  })

  // ...and reappear on right click
  map.on('contextmenu', function(mouseEvt) {
    if(map.hasLayer(magnifyingGlass)) {
      return;
    }
    map.addLayer(magnifyingGlass);
    magnifyingGlass.setLatLng(mouseEvt.latlng);
  });
}

window.onload = init;
