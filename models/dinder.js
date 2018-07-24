var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Dinder = sequelize.define("mdwpfj0mk61olm29", {
  group_name: {
    type: Sequelize.STRING
  },
  user_name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  restaurant_name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  rating: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  website: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
}, {
    timestamps: false
  });

Dinder.sync();

module.exports = Dinder;




