$(document).ready(function () {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    $("#hero-btn").click(function () {

        $('html, body').animate({ scrollTop: $('.container').offset().top }, 'slow');
    });


    $("#make-group-btn").click(function () {
        $("#new-group-form").slideToggle();

        $("#existing-group-form").slideUp(0);

        $(".introduction").slideUp(0);

        $("#group-form").slideUp(0);

        $("#restaurant-card").slideUp(0);

        $("#all-groups").slideUp(0);
    });


    $("#existing-group-btn").click(function () {
        $("#existing-group-form").slideToggle();

        $("#new-group-form").slideUp(0);

        $(".introduction").slideUp(0);

        $("#group-form").slideUp(0);

        $("#groupName").val("");
        $("#restNames").val("");

        $("#restaurant-card").slideUp(0);

        $("#all-groups").slideUp(0);
    });




    $("#pick-restaurant").click(function() {
        console.log("random is working");
        var group = $("#groupName").text().trim();
        $.get("/api/pickRestaurant/" + group).then(function (data) {
            if (data.length > 0) {
                restaurants = [];
                for (i=0; i<data.length; i++) {
                    restaurants.push(data[i]);
                }
                var restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
                $("#nameDiv").html("<h4>" + restaurant.restaurant_name + "</h4>"); 
                $("#addrDiv").text(restaurant.address);
                $("#phoneDiv").text(restaurant.phone);
                $("#ratingDiv").text("Rating: " + restaurant.rating);
                $("#photoDiv").empty();
                $("#photoDiv").append('<a href="' + restaurant.website + '" target=_blank><img id="restPhoto" src="'+ restaurant.photo + '" class="restaurant-photo"/></a>');
                $("#restPhoto").attr(restaurant.website);
            } else {
                $("#pick-result").text("No Restaurants have been added to this group.");
            }
        })
    });
});