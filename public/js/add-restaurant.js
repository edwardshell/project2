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

  var searchTerm = $("#restaurant-name").val().trim();
  // variable for grabbing search term out of form

  client.search(
    {
      q: searchTerm,
      count: "1"
      // use restaurant name input to search zomato
    },
    function(err, result) {
      if (!err) {
        var data = result.restaurants[0];
        parseZomato(data);
        console.log(data);
      } else {
        console.log(err);
      }
    }
  );
}

// Get wanted data from object and assign them to variables and assign values to respective columns in db

function parseZomato(data) {
  
  var name = data.restaurant.name;
  var address = data.restaurant.location.address;
  var cuisines = data.restaurant.cuisines;
  var image = data.restaurant.featured_image;
  var rating = data.restaurant.user_rating.aggregate_rating;
  var website = data.restaurant.url;
  var phone = data.restaurant.phone_numbers;

  console.log(data);
  restaurantDB(name, address, cuisines, image, rating, website, phone);
}

function restaurantDB(name, address, cuisines, image, rating, website, phone) {
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
  }

  $.post("api/newRestaurant", restaurant, function(data) {
    console.log("data saved", data);
    $("#username").val("");
    $("#restaurant-name").val("");
  });
  
} 
