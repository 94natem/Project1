
var geoLocation;
var cinemaLocation;
var lat;
var long;
// Pull values from location form .val().trim();

// location = location.split(" ").join("+");



//on click function for submit button
$("#submit").on("click", function () {
    var date = $("#input-date").val().trim();
    var location = $("#input-location").val().trim();
    console.log(location);

    //Geocode ajax to convert address to lat and long
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyC7cYVBuDvtxBDLzn62sHS0VlrDUf-WJMU",
        method: "GET"
    }).then(function(response) {
        console.log(response.results[0].geometry.location);

        lat = response.results[0].geometry.location.lat;
        console.log(lat);
        long = response.results[0].geometry.location.lng;
        console.log(long);
        geoLocation = lat+";"+long;

    
       //This is the ajax call on gracenote API using the lat and long variables
        $.ajax({
            url: "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&lat=" + lat + "&lng=" + long + "&api_key=ebxmggvfebvqkmhczkwvzxk4",
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://cors-anywhere.herokuapp.com/https://api-gate.movieglu.com/filmsNowShowing/?n=10",
    //     "method": "GET",
    //     "headers": {
    //       "client": "JODP",
    //       "x-api-key": "Uv2verHbVxaoEn6wULwZA7CSzalosEUMItrLOngc",
    //       "api-version": "v102",
    //       "Authorization": "Basic Sk9EUDowU3NaR0RNWWl1Y1o=",
    //       "Geolocation": geoLocation,
    //       "cache-control": "no-cache",
    //     //   "Postman-Token": "788f7bee-4f35-461c-b59d-1121cc5d807e"
    //     }
    //   }
      
    //   $.ajax(settings).done(function (response1) {
    //     console.log(response1.films[0].film_id);
    //     var movieArray = response1.films;
    //         for (var i = 0; i < movieArray.length; i++) {
    //             var filmName = movieArray[i].film_name;
    //             var filmId = movieArray[i].film_id;
    //             var newButton=$("<button>").text(filmName).attr("id", filmId).addClass("film-button");
    //             $("#new-button").append(newButton);

    //         }

    //   });
    // })
    // $("#submit").off()
});

$(document).on("click", ".film-button", function(event) {
    event.preventDefault();

    console.log(lat + ";" + long);
    // console.log(parseFloat(geoLocation));
    //Call film_id from the appended buttons and place in URL
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://api-gate2.movieglu.com/closestShowing/?film_id=197406",
        "method": "GET",
        "headers": {
          "client": "JODP",
          "x-api-key": "Uv2verHbVxaoEn6wULwZA7CSzalosEUMItrLOngc",
          "api-version": "v102",
          "Authorization": "Basic Sk9EUDowU3NaR0RNWWl1Y1o=",
          "Geolocation": lat + ";" + long,
        //   "lat": lat,
        //   "lng": long,
          "cache-control": "no-cache",
          "territory": "US"
        }
    }

    $.ajax(settings).done(function (response2) {
        console.log(response2)
    })
        
});


