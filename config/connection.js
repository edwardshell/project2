var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "qfu8fl81ln3zjmo7",
        password: "ayrcx6tt5twdv3sb",
        database: "mdwpfj0mk61olm29"
    });
}

connection.connect();
module.exports = connection;
