var apiKey = require('./../.env').apiKey;
var map = require('./../js/map.js');
var responses = [];
var infowindows = [];
var markers = [];

$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', map.initMap);

  $('#weatherLocation').click(function(event) {
    event.preventDefault();
    map.initMap();
    var city = $('#location').val();
    $('#location').val('');
    //get the weather in the search city
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey).then(function(newResponse) {
      console.log(newResponse);
      //push it to responses
      responses.push(newResponse);
      //set the map with the responses and get back the markers
      responses.forEach(function(response) {
        map.setMarker(response);
      });
      console.log(responses);

      //show the weather info
      $('.showWeather').append('<li><a class="city-name">' + newResponse.name + '</a></li>');
      $('.showWeather').append("<li>The humidity in " + newResponse.name + " is " + newResponse.main.humidity + "%</li>");
      $('.showWeather').append("<li>and the pressure is: " + newResponse.main.pressure + '</li>');
      $('.showWeather').append('<li>The temperature is: ' + newResponse.main.temp + 'degrees Farenheit');
      $('.showWeather').append('<li>This is the weather description: ' + newResponse.weather[0].description + '</li>');

    }).fail(function(error) {
      $('.showWeather').text(error.message);
    });



  });

  $('ul').on('click', 'a.city-name', function() {
    alert("hello");
    console.log(this.value);
    console.log('Hello!');
  });
});
