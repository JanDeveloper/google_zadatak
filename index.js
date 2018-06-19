var res;
var lattitude;
var longitude;
var venue;
var urlMap;
var url;
var map;
var pos;
var query;
var rad;
var infowindow;
var markers;
var infobox;
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
    query = '&query=' + $('#myText').val();
    rad = '&radius=' + $('#radius').val();
    url = urlMap + rad + query;
     $.ajax({
        url: url,
        dataType: 'json',
        success: function(data){
          var venues = data.response.venues;
          $.each(venues, function(i,venue){
            //$('#result').append('<p>' + venue.name + '<br />Address: ' + venue.location.address + '<br />City: ' + venue.location.city + '<br />Distance: ' + venue.location.distance + ' meters.</p><br />');
            lattitude = venue.location.lat;
            longitude = venue.location.lng;
            res = {lat:(lattitude), lng:(longitude)};
            pos = venue.name;
  
            markers = new google.maps.Marker({
            position: res,
            map: map,
            title: pos,
        });
        infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(markers, 'click', function() {
          infowindow.setContent('<div><p><strong>' + venue.name + '</strong><br />Address: ' + venue.location.address + '<br />City: ' + venue.location.city + '<br />Distance: ' + venue.location.distance + ' meters.</p><br /></div>');
          infowindow.open(map, this);
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
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var marker = new google.maps.Marker({
      position: myPosition,
      map: map,
      title: "Your position."
  });
  
}
