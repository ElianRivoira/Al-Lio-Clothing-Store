const express = require("express");
const router = express.Router();
const users = require("./users");
const products = require("./products");
const cart = require("./cart");
const checkout = require("./checkout");
const reviews = require("./reviews");

router.use("/users", users);
router.use("/products", products);
router.use("/checkout", checkout);
router.use("/cart", cart);
router.use("/reviews", reviews);


module.exports = router;
