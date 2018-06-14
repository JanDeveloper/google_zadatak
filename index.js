var map;
var infowindow;
var message;
$(document).ready(function () {
    $(".button-find").click(function () {
        initMap($("#myText").val(), $("#radius").val());
    });
});

function initMap(value, radius) {
    var pyrmont = {lat: 45.109835, lng: 20.727431};

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
        radius: radius ? radius : 1000,
        type: value
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