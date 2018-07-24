var globalCity;
var globalState;


var input = document.getElementById('location');
var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(cities)']
});

google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var city = place.address_components[0].short_name;
    var state = place.address_components[2].short_name;
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    globalCity = city;
    globalState = state;
});


function yelpSearchSettings(restaurant) {
    return {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + globalCity + "," + globalState + "&term=" + restaurant + "&limit=8",
        "method": "GET",
        "headers": {
            "authorization": "Bearer UVD6_jknwmi1GkRxFFkWh7HX-JV_TrlieWHvaSMfi69lmcN6MPUUxk5EGJNnUWmLD3TV5vtrZ25whGiC9gmJRUbhEW5lz3Y6hOXT5oAS-WqK7U5TA772Lt4tBqlaWnYx",
            "Cache-Control": "no-cache",
        }
    }
};


$("#submit-pick").click(function () {
    event.preventDefault();
    searchYelp();
});

function searchYelp() {

  var restaurant = $("#restaurant-name").val().trim();

  //$("#group-form input").val("");
    var settings = yelpSearchSettings(restaurant);

    $.ajax(settings).done(function (response) {

      var data = response.businesses[0];
        parseYelp(data);
        console.log(data);
    })
};

function parseYelp(data) {
    var name = data.name;
    var address = data.location.display_address[0];
    var phone = data.display_phone;
    var rating = data.rating;
    var photo = data.image_url;
    var website = data.url;
    console.log(data);
    restaurantDB(name, address, phone, rating, photo, website);
};


function restaurantDB(name, address, phone, rating, photo, website) {
    var restaurant = {
        user_name: $("#username").val().trim(),
        group_name: $("#groupName").text().trim(),
        restaurant_name: name,
        address: address,
        phone: phone,
        rating: rating,
        photo: photo,
        website: website,
    }
    $.post("/api/newRestaurant", restaurant)

        .then(function (data) {
            console.log("yelp api data saved to db: ", data);
            $("#username").val(""); 
            $("#location").val(""); 
            $("#restaurant-name").val("");
            // $("#submit-pick").removeClass("ld ld-over-full-inverse running");
        })
};