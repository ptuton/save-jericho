navigator.geolocation.getCurrentPosition(show_map);

function show_map(position){
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  $('#latitude').val(latitude);
  $('#longitude').val(longitude);

  map.setCenter({lat: latitude, lng: longitude});
  map.setZoom(15);
}
