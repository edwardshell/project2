module.exports = function(sequelize, DataTypes) {
  var Restaurants = sequelize.define("Restaurants", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Restaurants;
 };