var a;
var lt;
var lg;
var venue;
var urlMap;
var url;
var map;
var pos;
var val;
var rad;
var infowindow;
$(document).ready(function () {
  $(".button-find").click(function () {
    if($('#myText').val() === '') {
      $(".warnval").text("Please enter category.").show();
      $('#myText').focus();
      return false;
  }else{
    $(".warnval").hide();
  }
    $(".button-find").hide();
    $(".button").append('<button class="reload">Refresh</button>');
    urlMap = "https://api.foursquare.com/v2/venues/search?v=20180614&ll=45.109835,20.727431&intent=browse&client_id=U3TBPCTLGLQQ3MEFJLX3QZH3QESZEVHHOEXYWIIBG1YLPCHT&client_secret=DBNRFLKSMTTBVJ5G0VUYFUBTWKG5XOU5TPPL10PJYAI3LIUU";
    var val = '&query=' + $('#myText').val();
    var rad = '&radius=' + $('#radius').val();
    url = urlMap + rad + val;
     $.ajax({
        url: url,
        dataType: 'json',
        success: function(data){
          var venues = data.response.venues;
          $.each(venues, function(i,venue){
            $('#result').append('<p>' + venue.name + '<br />Address: ' + venue.location.address + '<br />City: ' + venue.location.city + '<br />Distance: ' + venue.location.distance + ' meters.</p><br />');
            lt = venue.location.lat;
            lg = venue.location.lng;
            a = {lat:(lt), lng:(lg)};
            pos = venue.name;
  
           var markers = new google.maps.Marker({
            position: a,
            map: map,
            title: pos,
        });
       
          });
          $(".reload").click(function () {
            location.reload();
            $(".reload").delete();
            $(".button-find").show();
            $.ajax({
              url: url,
              dataType: 'json',
              success: function(){}
            });
          })

        }
      })
  })

});
function initMap(value, radius) {
  
  var myPosition = {lat: 45.109835, lng: 20.727431}
  map = new google.maps.Map(document.getElementById('map'), {
      center: myPosition,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var marker = new google.maps.Marker({
      position: myPosition,
      map: map,
      title: "Your position."
  });
  
}
