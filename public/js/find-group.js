$("#find-group").click(function () {
    $("#allGroupsList").empty();
    var query = $('#existing-group').val().trim();
    searchGroup(query);
});

// Find a specific group
function searchGroup(query) {
    var search = "/api/groups"


    if (query.length > 0)
        search += "/" + query;
    $.get(search).then(function (data) {
        // console.log(data);
        //Later: add error div for no results found.
        if (data.length == 0)
            return;

            $("#existing-group-form").slideUp(0);

        $("#group-form").slideUp(0);
        if (query.length > 0) {

            $("#groupName").html("<p id='groupP'>" + query + "</p>");

            userList = [];
            for (i = 0; i < data.length; i++) {
                userList.push(data[i].user_name);
            }
            var splitUser = userList.join(" ");
            $("#userNames").text(splitUser);
            $("#user-list").show();
            $("#group-form").slideToggle();
        } else {
            $("#all-groups").slideToggle();
            for (i = 0; i < data.length; i++) {
                var div = $("<div class='allGroupsItem'>");
                var group = data[i].group_name;
                var btn = $("<button class='allGroupsItemBtn'>");
                btn.text(group);
                div.append(btn);
                $("#allGroupsList").append(div);
                btn.click(function () {
                    $("#all-groups").slideUp(0);
                    var query = this.innerHTML;
                    searchGroup(query);
                })
                $("#mapContainer").show();
            }
        }
    })
};
