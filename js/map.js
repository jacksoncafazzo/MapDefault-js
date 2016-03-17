var mapApiKey = require('./../.env').mapsApiKey;
var map;
var marker;
var myLatLng = {lat: 45.397, lng: -122.60};
var markers = [];
var infowindows = [];
var donkeykong = "img/donkeykong.png";

exports.initMap = function() {
  var myStyles =[
  {
       featureType: "poi",
       elementType: "labels",
       stylers: [
             { visibility: "off" }
       ]
   }
  ];

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.Terrain,
    styles: myStyles
  });


};

exports.setMarker = function(response) {
  myLatLng.lat = response.coord.lat;
  myLatLng.lng = response.coord.lon;
  console.log(myLatLng);

  alert(response.name);

  //either way, what's the content? oh it's this stuff:
  var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Marker BOUNCE</h1>'+
    '<div id="bodyContent">'+
    '<li>' + response.name + '</li>'+
    '<p><b>Bounce</b>, <b>BOUNCE</b></p>'+
    '<p><b>bouncebouncebouncebounce</b></p>'+
    '</div>'+
    '</div>';
//make the info window
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });

//make the marker
  var marker = new google.maps.Marker({
    position: myLatLng,
    draggable: true,
    icon: donkeykong,
    animation: google.maps.Animation.DROP,
    map: map,
    title: response.name
  });
//what to do when this one is clicked
  marker.addListener('click', function() {
    toggleBounce(marker);
    infowindow.open(map, marker);
  });
  //put it on the map
  marker.setMap(map);
  // pan to the marker as it is created
  map.panTo(marker.getPosition());
  //add to the markers list
  markers.push(marker);
  //add to infowindows
  infowindows.push(infowindow);
};

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function locateUser() {
  if (navigator.geolocation) {
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

function geolocationSuccess(position) {
  // here we take the `position` object returned by the geolocation api
  // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
  // it 2 arguments: one for latitude, one for longitude.
  // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
  // But you must use coordinates to use this method.
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom : 16,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  // Draw the map - you have to use 'getElementById' here.
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  // Place the marker
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

function geolocationError(positionError) {
  alert(positionError);
}
