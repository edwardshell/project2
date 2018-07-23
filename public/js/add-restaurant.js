var zomato = require("npm-zomato-search");

var globalCity;
var globalState;

var input = document.getElementById("location");
var autocomplete = new google.maps.places.Autocomplete(input, {
  types: ["(cities)"]
});

google.maps.event.addListener(autocomplete, "place_changed", function() {
  var place = autocomplete.getPlace();
  var city = place.address_components[0].short_name;
  var state = place.address_components[2].short_name;
  var lat = place.geometry.location.lat();
  var lng = place.geometry.location.lng();
  globalCity = city;
  globalState = state;
});

$("#submit-pick").click(function() {
  event.preventDefault();
  searchZomato();
});

function searchZomato() {
  var client = zomato.createClient({
    userKey: "591abf213dbc64871a5d5ab5740a00ed" //as obtained from [Zomato API](https://developers.zomato.com/apis)
  });

  var searchTerm = $("#new-restaurant").val().trim();
  // variable for grabbing search term out of form

  client.search(
    {
      q: searchTerm,
      count: "1"
      // use restaurant name input to search zomato
    },
    function(err, result) {
      if (!err) {
        var temp = JSON.parse(result, null, 2);
        console.log(temp.restaurants[0].restaurant.name);
        parseZomato(temp);
        console.log(temp.restaurants[0].restaurant.name);
      } else {
        console.log(err);
      }
    }
  );
}

// Get wanted data from object and assign them to variables and assign values to respective columns in db

function parseZomato(temp) {
  
  var name = temp.restaurants[0].restaurant.name;
  var address = temp.restaurants[0].restaurant.location.address;
  var cuisines = temp.restaurants[0].restaurant.cuisines;
  var image = temp.restaurants[0].restaurant.featured_image;
  var rating = temp.restaurants[0].restaurant.user_rating.aggregate_rating;
  var website = temp.restaurants[0].restaurant.url;
  var phone = temp.restaurants[0].restaurant.phone_numbers;

  console.log(data);
  dinderDB(name, address, cuisines, image, rating, website, phone);
}

function dinderDB(name, address, cuisines, image, rating, website, phone) {
  var restaurant = {
    user_name: $("#username").val().trim(),
    group_name: $("#groupname").val().trim(),
    restaurant_name: name,
    address: address,
    cuisines: cuisines,
    phone: phone,
    rating: rating,
    photo: image,
    website: website,
  };

  $.post("api/restaurants", restaurant, function(data) {
    console.log("data saved", data);
    $("#username").val("");
    $("#new-restaurant").val("");
  });
  
} 