function init() {
  var tileUrl = 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var tile_pt = 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=30a41d79c1184e6ba734df2aa9671c93';
  var tile_cycle = 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=30a41d79c1184e6ba734df2aa9671c93';
  var tileOptions = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    subdomains: '1234'
  };
var locationLatLng = [0.0, 0.0];

var map = new L.map('map', {
    center: [50.9794934, 11.3235439],
    zoom: 16,
    layers: [
      L.tileLayer(tileUrl, tileOptions)
    ]
  }); 
  
   L.easyButton('fa-bicycle', function(){
		alert('You just clicked a font awesome icon');
	}).addTo(map);

	   L.easyButton('fa-bus', function(){
		alert('You just clicked a font awesome icon');
	}).addTo(map);
	
  var magnifyingGlass = L.magnifyingGlass({
    radius: 50,
    zoomOffset: 1,
    layers: [ L.tileLayer(tile_pt)],
    fixedPosition: true
  });

 map.addLayer(magnifyingGlass);
 
 map.locate({setView: true, maxZoom: 16});

 map.on('locationfound', function(e){
		locationLatLng = e.latlng;
		map.setView(locationLatLng, 16);
		magnifyingGlass.setLatLng(locationLatLng);
 })

 map.on('locationerror', function(e){
	alert(e.message);
	locationLatLng = [50.9794934, 11.3235439];
	map.setView(locationLatLng, 16);
	magnifyingGlass.setLatLng(locationLatLng);
	})
	
    var magnifyingGlassCycle = L.magnifyingGlass({
	  radius: 50,
	  zoomOffset: 1,
	  layers: [L.tileLayer(tile_cycle)],
	  fixedPosition: false,
  })
  
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
