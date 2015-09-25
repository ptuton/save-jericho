google.maps.event.addDomListener(window, 'load', init_map);

var map;

function init_map(){
  //var latitude = $('#latitude').val();
  //var longitude = $('#longitude').val();

  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(mapCanvas, mapOptions);
}
