$( document ).on( "pageinit", "#map-page", function() {
		
    var defaultLatLng = new google.maps.LatLng(45.109835, 20.727431);
        function success(pos) {
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
  
      function fail(error) {
            drawMap(defaultLatLng);
        }
  
        drawMap(defaultLatLng);
    function drawMap(latlng) {
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
     
        google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
        });     
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Your position."
        });
        var markerStar = new google.maps.Marker({
            position: new google.maps.LatLng(45.1176739, 20.7300554),
            map: map,
            title: "Cafe Star"
        });
        var markerUnder = new google.maps.Marker({
            position: new google.maps.LatLng(45.1147648, 20.7290918),
            map: map,
            title: "Cafe Underground"
        });
    }
   
   
});