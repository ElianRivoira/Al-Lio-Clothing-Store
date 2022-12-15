import { useEffect, useState } from "react";
import { getOneProduct } from "../state/products";
import { createReview, getAllReviews } from "../state/reviews";
import { addProductToCart } from "../state/cart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  Button,
  Grid,
  Rating,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../styles/Item/styles.css";

function Item() {
  const dispatch = useDispatch();
  const [talle, setTalle] = useState("");
  const params = useParams();
  const id = params.id;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);

  const product = useSelector((state) => state.products.oneProduct);
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.users.userData);
  const userId = user.id;

  useEffect(() => {
    dispatch(getOneProduct(id));
    dispatch(getAllReviews(id));
  }, [id]);

  let handleChange = (event) => {
    setTalle(event.target.value);
  }; // Esto guarda el talle seleccionado

  const inputHandler = (e) => {
    setComment(e.target.value);
  };

  const ratingHandler = (e, newValue) => {
    setRating(newValue);
  };

  const handleReview = () => {
    dispatch(
      createReview({
        userId: user.id,
        productId: id,
        comments: comment,
        rating: rating,
      })
    );
  };

  let addCarrito = () => {
    dispatch(addProductToCart({ productId: id, userId: userId, quantity: 1 }));
    alert(`Agregado con éxito`);
  };

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="divCentrado">
              <img
                className="fotoItem"
                src={product.img ? `${product.img[0]}` : ""}
                alt="Producto"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="topDiv">
              <h1>{product.name}</h1>
              <p>
                <Rating
                  name="read-only"
                  value={product.rating ? product.rating : 0}
                  precision={0.5}
                  readOnly
                />
              </p>
              <p>Detalle: {product.description}</p>
              <p>Color: {product.colour}</p>

              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-label">Talle:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={talle}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={product.size}>{product.size}</MenuItem>
                </Select>
              </FormControl>

              <p style={{ fontSize: "1.5rem" }}>Precio: ${product.price}</p>
              <Button
                onClick={addCarrito}
                startIcon={<AddShoppingCartIcon />}
                style={{
                  backgroundColor: "#ead7c3",
                  color: "black",
                  fontFamily: "Canaro",
                }}
              >
                Agregar al carrito
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="divReviews">
        <h4>Comentarios de compradores:</h4>
        {reviews.map((review, i) => (
          <div key={i} className="divReview">
            <Rating name="read-only" value={review.rating} readOnly />
            <p>{review.comments}</p>
          </div>
        ))}
      </div>
      {user.name ? (
        <div className="formContainer">
          <h2 className="addProductTitle">Opinar sobre este producto</h2>
          <div className="inputsContainer">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={ratingHandler}
            />
            <textarea
              onChange={inputHandler}
              id="description"
              placeholder={`Comentanos tu opinion sobre la prenda `}
            ></textarea>
            <button onClick={handleReview}>ENVIAR</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Item;
