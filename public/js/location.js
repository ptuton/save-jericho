$('button').click(function(){
  navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos.coords);
    $.ajax({
      data: pos.coords,
      dataType: 'json',
      method: 'post',
      url: '/location',
      success: function(response){
        $('#address').text(JSON.stringify(response));
      }
    });
  });
});
