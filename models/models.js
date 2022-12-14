const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: true },
  login: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const News = sequelize.define("News", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },

  viewing: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Comments = sequelize.define("Comments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING },
});

User.hasMany(Comments);
Comments.hasOne(User);

Comments.hasOne(News);
News.hasMany(Comments);

module.exports = {
  User,
  News,
  Comments,
};
