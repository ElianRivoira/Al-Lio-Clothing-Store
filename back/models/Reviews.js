const S = require("sequelize");
const db = require("../db/config");

class Reviews extends S.Model {}

Reviews.init(
  {
    rating: { 
      type: S.INTEGER 
    },
    comments: { 
      type: S.STRING 
    },
  },
  {
    sequelize: db,
    modelName: "reviews",
  }
);

module.exports = Reviews;
