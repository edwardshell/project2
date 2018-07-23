var Sequelize = require("sequelize");

  sequelize = new Sequelize("mdwpfj0mk61olm29", "qfu8fl81ln3zjmo7", "ayrcx6tt5twdv3sb", {
    host: "k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

module.exports = sequelize;