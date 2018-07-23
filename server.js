var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

require("./routing/html-routes.js")(app);
require("./routing/api-routes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
