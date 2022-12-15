const { Product } = require("../models/index");

const findAll = async () => {
  const products = await Product.findAll();
  return products;
};

const filterProducts = async filter => {
  if(filter.category){
    const products = await Product.findAll({
      where: {category:filter.category},
    });
    return products;
  }else if (filter.name){
    const products = await Product.findAll({
      where: {name:filter.name},
    });
    return products;
  }
};

const findOne = async id => {
  const product = await Product.findOne({
    where: { id },
  });
  return product;
};

const add = async body => {
  const product = await Product.create(body);
  return product;
};

const destroy = async id => {
  await Product.destroy({ where: { id } });
};

const update = async (body, id) => {
  const [affectedRows, updated] = await Product.update(body, {
    where: { id },
    returning: true,
  });
  return updated[0];
};

module.exports = {
  add,
  findAll,
  filterProducts,
  findOne,
  update,
  destroy,
};
