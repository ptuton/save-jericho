var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(84,84,84,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(255,255,205,1)",
            pointColor: "rgba(192,192,192,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
  };

/* $.ajax({
  data: {},
  dataType: 'json',
  method: 'post',
  url: '/biodata',
  success: create_chart(data)
});
*/
create_chart(data);

function create_chart(data){
  //alert(data.datasets[0].label);
    var ctx = $("#gyroY").get(0).getContext("2d");
    var chrtCecil_bro = new Chart(ctx).Line(data);
}
