$('#get-quote').click(function(){
  $.ajax({
    dataType: 'json',
    method: 'post',
    url: '/quote',
    success: function(response){
      $('#quote').text(response.quote);
      $('#author').text('-' + response.author);
    }
  });
});

$('.send-sms').click(function(){
  var quote = $('#quote').text();
  var phone = $(this).parent().children('.phone').text();
  $.ajax({
    data: {phone: phone, quote: quote},
    dataType: 'json',
    method: 'post',
    url: '/send-quote',
    success: function(response){
      console.log(response);
    }
  });
});
