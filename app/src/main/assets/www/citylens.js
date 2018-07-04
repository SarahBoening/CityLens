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
    center: [50, 10],
    zoom: 5,
    layers: [
      L.tileLayer(tileUrl, tileOptions)
    ],
	gestureHandling: true
  }); 
  
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
	
	L.easyButton('fa-location-arrow', function(){
		map.locate({setView: true, maxZoom: 16});
	}).addTo(map);

	L.easyButton('fa-bus', function(){
		if(map.hasLayer(magnifyingGlassCycle))
		   map.removeLayer(magnifyingGlassCycle);
		if(map.hasLayer(magnifyingGlass))
			map.removeLayer(magnifyingGlass);
		else{
			map.addLayer(magnifyingGlass);
			magnifyingGlass.setLatLng(locationLatLng);
	   }
	}).addTo(map);
	
   L.easyButton('fa-bicycle', function(){
		if(map.hasLayer(magnifyingGlass))
		   map.removeLayer(magnifyingGlass);
		if(map.hasLayer(magnifyingGlassCycle))
			map.removeLayer(magnifyingGlassCycle);
		else{
			map.addLayer(magnifyingGlassCycle);
			magnifyingGlassCycle.setLatLng(locationLatLng);
		}
	}).addTo(map);
	
  var magnifyingGlass = L.magnifyingGlass({
    radius: 60,
    zoomOffset: 1,
    layers: [ L.tileLayer(tile_pt)]
  })

 var magnifyingGlassCycle = L.magnifyingGlass({
	  radius: 60,
	  zoomOffset: 1,
	  layers: [L.tileLayer(tile_cycle)]

  })
  
  map.on('click', function(mouseEvt) {
    if(map.hasLayer(magnifyingGlass))
		magnifyingGlass.setLatLng(mouseEvt.latlng);
	if(map.hasLayer(magnifyingGlassCycle))
		magnifyingGlassCycle.setLatLng(mouseEvt.latlng);
	})
}

window.onload = init;
