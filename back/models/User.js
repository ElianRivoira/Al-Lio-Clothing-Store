const S = require("sequelize");
const db = require("../db/config");
const bcrypt = require("bcrypt");

class User extends S.Model {
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        min: 8
      }
    },
    salt: {
      type: S.STRING,
    },
    genre: {
      type: S.STRING,
      allowNull: false,
    },
    type: {
      type: S.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    credits: { 
      type: S.INTEGER, 
      allowNull: false,
      defaultValue: 100
    },
  },

  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = User;
