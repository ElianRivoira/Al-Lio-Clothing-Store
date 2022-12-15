import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsRequests } from "./products";

const initialState = {
  isLoading: true,
  cart: [],
  finalPrice: 0,
};

export const cartRequests = axios.create({
  baseURL: "http://localhost:3001/api/cart",
});

export const getAllCartProducts = createAsyncThunk(
  "GET_ENTIRE_CART",
  (userId) => {
    return cartRequests
      .get(`/${userId}`)
      .then(async (cartItems) => {
        const finalCart = {};
        const allProductsRequests = {};
        allProductsRequests.requests = cartItems.data.map((el) =>
          productsRequests.get(`/${el.productId}`)
        );
        const quantities = cartItems.data.map((el) => {
          return { productId: el.productId, quantity: el.quantity };
        });
        finalCart.products = await Promise.all(allProductsRequests.requests)
          // .then((products) => products)
          .then((products) => {
            const finalProducts = [];
            for (let i = 0; i < products.length; i++) {
              if (products[i].data.id === quantities[i].productId) {
                console.log(finalProducts);
                products[i].data.quantity = quantities[i].quantity;
                finalProducts.push(products[i].data);
              }
            }
            return finalProducts;
          });
        finalCart.finalPrice = cartItems.data.reduce(
          (initialValue, cartItem) => {
            return initialValue + cartItem.finalPrice;
          },
          0
        );
        return finalCart;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

export const addProductToCart = createAsyncThunk(
  "ADD_TO_CART",
  (itemAndUserData) => {
    return cartRequests
      .post("/", itemAndUserData)
      .then(() => "Added successfully!")
      .catch((error) => {
        throw error;
      });
  }
);

export const removeProductFromCart = createAsyncThunk(
  "REMOVE_FROM_CART",
  (removeData) => {
    return cartRequests
      .delete(`/${removeData.userId}/${removeData.productId}`)
      .then(() => "Removed successfully!")
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);
export const updateQuantityFromCart = createAsyncThunk(
  "UPDATE_CART_QUANTITY",
  (userItemAndQuantity) => {
    return cartRequests
      .put("/", userItemAndQuantity)
      .then(() => "Updated successfully!")
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [addProductToCart.pending]: (state) => {
      state.isLoading = true;
    },
    [addProductToCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
    [addProductToCart.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeProductFromCart.pending]: (state) => {
      state.isLoading = true;
    },
    [removeProductFromCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
    [removeProductFromCart.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateQuantityFromCart.pending]: (state) => {
      state.isLoading = true;
    },
    [updateQuantityFromCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
    [updateQuantityFromCart.rejected]: (state) => {
      state.isLoading = false;
    },
    [getAllCartProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCartProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [getAllCartProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default cartSlice.reducer;
