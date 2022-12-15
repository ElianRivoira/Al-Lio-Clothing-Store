const express = require("express");
const router = express.Router();
const {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  getProducts,
} = require("../controllers/cart");

router.post("/", addProductToCart);

router.delete("/:userId/:productId", removeProductFromCart);

router.put("/", updateQuantity);

router.get("/:id", getProducts);

module.exports = router;
