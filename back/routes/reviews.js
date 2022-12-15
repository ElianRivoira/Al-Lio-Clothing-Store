const express = require("express");
const router = express.Router();
const {
  allReviews,
  newReview,
  ratingAverage,
} = require("../controllers/reviews");

//ruta para obtener todos los reviews de un producto
router.get("/:productId", allReviews);

//ruta para generar un nuevo comentario y rating ( se le tiene que pasar el userID, ProdutID, comment y rating)
router.post("/", newReview);

//ruta para sacar el promedio del rating, con el params
router.get("/ratings/:productId", ratingAverage);

module.exports = router;
