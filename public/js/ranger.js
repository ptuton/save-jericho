$('#cam-on').click(function(){
  Webcam.attach('#camera');
});

$('#cam-off').click(function(){
  Webcam.reset();
});

$('#snap').click(function(){
  Webcam.snap( function(data_uri){
    $('#photo').attr('src', data_uri);
  });
});

$('#sms').click(function(){
  var phone = $('#phone').val();
  var message = $('#message').val();

  $.ajax({
    data: {phone: phone, message: message},
    dataType: 'json',
    method: 'post',
    url: '/message',
    success: function(response){
      console.log(response);
    }
  });

});

$('#update').click(function(){

  // Grab the ranger's data
  var _id = $('#name').data('id');
  var _rev = $('#name').data('rev');
  var name = $('#name').text();
  var mobile = $('#mobile').val();
  var longitude = $('#longitude').val();
  var latitude = $('#latitude').val();
  var photo = $('#photo').attr('src');

  $.ajax({
    data: {_id: _id, _rev: _rev, name: name, mobile: mobile, longitude: longitude, latitude: latitude, photo: photo},
    dataType: 'json',
    method: 'put',
    url: '/ranger/' + _id,
    success: function(response){
      alert('Saved!');
    }
  });

});
