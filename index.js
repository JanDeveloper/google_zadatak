var map;
var infowindow;
var x;
var message;
//$(document).ready(function () {
//$("button").click(function () { 
  
function initMap() {
  var pyrmont = {lat: 45.109835, lng: 20.727431};
  $("button").click(function(){
    $("#myText").val("store");
});
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
  });
  var marker = new google.maps.Marker({
      position: pyrmont,
      map: map,
      title: "Your position."
  });
  
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: myFunction(x) 
  }, callback); 

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);

    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
  });

  google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Adresa: ' + place.vicinity + '<br>'+
          place.scope +'</div>');
        infowindow.open(map, this);
      });
    
}
//})
function myFunction(x) {
x = document.getElementById("myText").value;
return x;
}
function pageReload() {
    location.reload();
}
 