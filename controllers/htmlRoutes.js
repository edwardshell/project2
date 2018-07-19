var db = require("../models");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/html/index.html"));
});