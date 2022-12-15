const User = require("./User");
const Product = require("./Product");
const Compras = require("./Compras");
const Reviews = require("./Reviews");
const Cart = require("./Cart");

Product.belongsToMany(User, { through: Cart });
User.belongsToMany(Product, { through: Cart });

Product.belongsToMany(User, { through: Compras });
User.belongsToMany(Product, { through: Compras });

Product.belongsToMany(User, { through: Reviews });
User.belongsToMany(Product, { through: Reviews });

module.exports = { User, Product, Compras, Reviews, Cart };
