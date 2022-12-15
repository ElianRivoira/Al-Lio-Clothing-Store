import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  products: [],
  oneProduct: {},
  filteredProducts: []
};

export const productsRequests = axios.create({
  baseURL: "http://localhost:3001/api/products",
});

export const getAllProducts = createAsyncThunk("GET_ALL_PRODUCTS", () => {
  return productsRequests
    .get("/")
    .then((clothesArray) => clothesArray.data)
    .catch((error) => {
      throw new Error(error.message);
    });
});
export const getOneProduct = createAsyncThunk("GET_ONE_PRODUCT", (id) => {
  return productsRequests
    .get(`/${id}`)
    .then((product) => product.data)
    .catch((error) => {
      throw new Error(error.message);
    });
});
export const postOneProduct = createAsyncThunk(
  "POST_ONE_PRODUCT",
  (payload) => {
    return productsRequests
      .post("/", payload)
      .then((product) => product.data)
      .catch((error) => {
        console.log(error)
        throw new Error(error.message);
      });
  }
);
export const searchProducts = createAsyncThunk(
  "SEARCH_PRODUCTS",
  (name) => {
    // para buscar por categoria especificar la prop type con el valor 'cat' y la prop category con la categoria deseada
    //para buscar por nombre de producto especificar la prop name con el nombre deseado
    return productsRequests
      .get(`/search/name/${name}`)
      .then((products) => {
        return products.data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);
export const searchCatProducts = createAsyncThunk(
  "SEARCH_CAT_PRODUCTS",
  (category) => {
    // para buscar por categoria especificar la prop type con el valor 'cat' y la prop category con la categoria deseada
    //para buscar por nombre de producto especificar la prop name con el nombre deseado
    return productsRequests
      .get(`/search/cat/${category}`)
      .then((products) => {
        return products.data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getAllProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    [getOneProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getOneProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.oneProduct = action.payload;
    },
    [getOneProduct.rejected]: (state) => {
      state.isLoading = false;
    },
    [postOneProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [postOneProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [postOneProduct.rejected]: (state) => {
      state.isLoading = false;
    },
    [searchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [searchProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    [searchCatProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [searchCatProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.filteredProducts = action.payload;
    },
    [searchCatProducts.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
