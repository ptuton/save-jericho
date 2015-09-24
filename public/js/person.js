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

$('#update').click(function(){

  var _id = $('#name').data('id');
  var _rev = $('#name').data('rev');
  var name = $('#name').text();
  var photo = $('#photo').attr('src');
  var phone = $('#phone').val();

  $.ajax({
    data: {_id: _id, _rev: _rev, name: name, photo: photo, phone: phone},
    dataType: 'json',
    method: 'put',
    url: '/people/' + _id,
    success: function(response){
      console.log(response);
    }
  });

});
