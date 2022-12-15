const { Cart } = require("../models/index");

const getAll = async (id) => {
  const products = await Cart.findAll({ where: { userId: id } });
  return products;
};

module.exports = { getAll };
