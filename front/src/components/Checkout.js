import React from "react";
import "../styles/checkout/styles.css";
import { useSelector } from "react-redux";

const Checkout = () => {
  const userName = useSelector((state) => state.users.userData.name);

  return (
    <div>
      <div className="checkout">
        <h3>{userName}, gracias por tu compra!</h3>
        <h5>En breve te enviaremos un mail con el detalle de su compra</h5>
      </div>
    </div>
  );
};

export default Checkout;
