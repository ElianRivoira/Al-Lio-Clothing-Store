import React from "react";
import "../styles/CartItem/style.css";
import { useSelector } from "react-redux";
import {
  getAllCartProducts,
  addProductToCart,
  removeProductFromCart,
  updateQuantityFromCart,
} from "../state/cart";
import { useDispatch } from "react-redux";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { DeleteOutline } from "@mui/icons-material";

const CartItem = ({ productData }) => {
  const productId = productData.id;
  const userId = useSelector((state) => state.users.userData.id);
  const dispatch = useDispatch();
  return (
    <div className="cartItemContainer">
      <img src={productData.img[0]} className="cartImg" alt="cartItemImg"></img>
      <h2 className="itemTitle">{productData.name}</h2>
      <h2 className="itemPrice">${productData.price}</h2>
      <div style={{ alignSelf: "center" }}>
        <ExpandLess
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(addProductToCart({ productId, userId, quantity: 1 })).then(
              () => {
                dispatch(getAllCartProducts(userId));
              }
            );
          }}
        />
        <h2 className="itemTitle">{productData.quantity}</h2>
        <ExpandMore
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(
              updateQuantityFromCart({
                productId,
                userId,
                quantity: productData.quantity - 1,
              })
            ).then(() => {
              dispatch(getAllCartProducts(userId));
            });
          }}
        />
      </div>
      <DeleteOutline
        onClick={() => {
          dispatch(
            removeProductFromCart({
              productId,
              userId,
            })
          ).then(() => {
            dispatch(getAllCartProducts(userId));
          });
        }}
        style={{ alignSelf: "center", fontSize: "250%", cursor: "pointer" }}
      />
    </div>
  );
};

export default CartItem;
