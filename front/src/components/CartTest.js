import React, { useEffect } from "react";
import {
  getAllCartProducts,
  removeProductFromCart,
  addProductToCart,
  updateQuantityFromCart,
} from "../state/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function CartTest() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {}, [cart.isLoading]);
  const add = () => {
    dispatch(addProductToCart({ productId: 3, userId: 1, quantity: 5 }));
  };
  const remove = () => {
    dispatch(removeProductFromCart({ productId: 3, userId: 1 }));
  };
  const update = () => {
    dispatch(updateQuantityFromCart({ productId: 3, userId: 1, quantity: 1 }));
  };
  const getAll = () => {
    dispatch(getAllCartProducts(1));
  };

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={add}>Agregame</button>
      <button onClick={getAll}>Traeme todo</button>
      <button onClick={remove}>Borrame el 3</button>
      <button onClick={update}>Updateame el 3</button>
    </div>
  );
}

export default CartTest;
