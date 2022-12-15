const S = require("sequelize");
const db = require("../db/config");

const Product = require("./Product");

class Cart extends S.Model {
  updateFinalPrice(productId, userId, quantity) {
    return Product.findOne({ where: { id: productId } })
      .then((product) => {
        return product.price;
      })
      .then((price) => {
        return price * quantity;
      })
      .then((finalPrice) => {
        return Cart.update(
          { finalPrice, quantity },
          {
            where: {
              productId,
              userId,
            },
            returning: true,
          }
        );
      });
  }
}

Cart.init(
  {
    quantity: {
      type: S.INTEGER,
    },
    finalPrice: {
      type: S.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "cart",
  }
);

Cart.beforeCreate(async (newProduct) => {
  const product = await Product.findOne({
    where: { id: newProduct.productId },
  });
  return (newProduct.finalPrice = product.price * newProduct.quantity);
});

module.exports = Cart;
