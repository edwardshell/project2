var db = require("../models");
// var path = require("path");

module.exports = function (app) {
 // Get all examples
 app.get("/api/restaurants", function (req, res) {

   db.Restaurant.findAll({})
     .then(function(response) {
       res.json(response);
     });
 });
 // });
};