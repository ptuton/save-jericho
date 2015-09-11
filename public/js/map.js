var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

initMap();

$('#find-me').click(function(){
  navigator.geolocation.getCurrentPosition(function(pos){
    map.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
    map.setZoom(14);
  });
});
