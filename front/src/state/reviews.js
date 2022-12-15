import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  reviews: [],
};

export const reviewsRequests = axios.create({
  baseURL: "http://localhost:3001/api/reviews",
});

export const getAllReviews = createAsyncThunk("GET_ALL_REVIEWS", productId => {
  return reviewsRequests
    .get(`/${productId}`)
    .then(reviews => reviews.data)
    .catch(error => {
      throw new Error(error.message);
    });
});

export const createReview = createAsyncThunk("CREATE_REVIEW", payload => {
  return reviewsRequests
    .post("/", payload)
    .then(review => review.data)
    .catch(error => {
      throw new Error(error.message);
    });
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllReviews.pending]: state => {
      state.isLoading = true;
    },
    [getAllReviews.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload;
    },
    [getAllReviews.rejected]: state => {
      state.isLoading = false;
    },
    [createReview.pending]: state => {
      state.isLoading = true;
    },
    [createReview.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.reviews = [...state.reviews, action.payload];
    },
    [createReview.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default reviewsSlice.reducer;
