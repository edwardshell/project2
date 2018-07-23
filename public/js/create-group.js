
$("#submit-new-grp").on("click", function (event) {
    
    var newGroup = {
        group_name: $("#new-group").val().trim(),
        // user_name: $("#new-user").val().trim(),
    };
    // Later: check if group exists in database
    $.get("/api/groups")


    $.post("/api/newGroup", newGroup)

    .then(function (data) {


        var query = newGroup.group_name;
            searchGroup(query);

            $("#new-group-form input").val("");

            $("#new-group-form").slideUp(0);

            $("#group-form").slideToggle();
        });




});



