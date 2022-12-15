import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Cartitem from "../commons/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/Cart/style.css";
import { getAllCartProducts } from "../state/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.userData.id);
  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (userId) dispatch(getAllCartProducts(userId));
  }, []);

  const toTheLandingPage = () => {
    navigate("/");
  };

  const checkout = () => {
    axios.post("http://localhost:3001/api/checkout/confirm", {userId:userId})
    .then(()=>{
      axios.post("http://localhost:3001/api/checkout/checkout", {userId:userId})
      .then(result=>{
      console.log(result)
      navigate("/checkout")
      })
    })
  }

  return (
    <div className="cartContainer">
      <div className="cartTitle">
        <h1>Tu carrito </h1>
      </div>
      <div className="cartItems">
        {cartItems.products
          ? cartItems.products.map((el) => <Cartitem key={el.id} productData={el} userId />)
          : ""}
      </div>
      <h1 className="finalPrice">
        Precio total: $<span id="precioTotal">{cartItems.finalPrice}</span>
      </h1>
      <div className="cartButtonsContainer">
        <Button
          onClick={toTheLandingPage}
          style={{
            fontSize: "110%",
            fontWeight: "500",
            background: "#ead7c3",
            width: "15%",
            color: "black",
            fontFamily: "Canaro",
          }}
          className="cartButton"
        >
          Volver al Inicio
          <LogoutIcon />
        </Button>

        <Button
          style={{
            fontSize: "110%",
            fontWeight: "500",
            background: "#ead7c3",
            width: "15%",
            color: "black",
            fontFamily: "Canaro",
          }}
          className="cartButton"
          onClick={checkout}
        >
          Finalizar Compra
          <LocalMallIcon />
        </Button>
      </div>
    </div>
  );
};

export default Cart;
