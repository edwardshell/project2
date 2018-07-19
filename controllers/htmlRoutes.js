// var db = require("../models");
var path = require("path");

module.exports = function (app) {
  console.log(path);
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/html/index.html"));
  });
};