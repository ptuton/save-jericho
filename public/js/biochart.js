$.ajax({
  data: {},
  dataType: 'json',
  method: 'post',
  url: '/biodata',
  success: function (data) {
      //var ctx = $("#biodata").get(0).getContext("2d");
      var ctx = document.getElementById("biodata").getContext("2d");
      var chrtBiodata = new Chart(ctx).Line(data);
      document.getElementById('biodata-legend').innerHTML = chrtBiodata.generateLegend();
  }
});
