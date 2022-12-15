import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import products from "./products";
import users from "./users";
import cart from "./cart";
import reviews from "./reviews";


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    products,
    users,
    cart,
    reviews
  },
});

export default store;
