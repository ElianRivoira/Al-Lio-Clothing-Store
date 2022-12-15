const express = require("express");
const router = express.Router();
const { Compras, User, Product, Cart } = require("../models/index");

const {
  allCompras,
  comprasSingleUser,
  comprasSingleProduct,
  checkout,
  confirm,
  modifyState,
} = require("../controllers/checkout");

//ruta para todas las compras
router.get("/", allCompras);

//ruta para todas las compras de un solo usuario
router.get("/search/:id", comprasSingleUser);

//ruta para todas las compras de un solo producto
router.get("/search/products/:id", comprasSingleProduct);

//ruta para enviar el mail de confirmacion de compra con todos los datos de la compra y elimina el cart del usuario , solo requiere el user ID.
router.post("/checkout", checkout);

//ruta para corroborar y modificar el stock; para corroborar y modificar los credits ; para crear la compra de cada productos relacionado a un usuario, solo requiere el user ID.
router.post("/confirm", confirm);

//ruta para modificar el estado de la compra y enviar mail de confirmacion al cliente. (se debe enviar el Compras.state por el req.body y el usuario por params)
router.put("/:id", modifyState);
module.exports = router;
