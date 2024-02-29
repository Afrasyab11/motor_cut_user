import { createSlice } from "@reduxjs/toolkit";
import { getCouponID, getSubscriptionAction } from "./subscriptionThunk";

const initialState = {
  subscriptionLoader: false,
  error: null,
  subscription: [],
  couponLoader:false
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    // Your synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionAction.pending, (state) => {
        state.subscriptionLoader = true;
      })
      .addCase(getSubscriptionAction.fulfilled, (state, action) => {
        state.subscriptionLoader = false;
        state.subscription = action.payload;
      })
      .addCase(getSubscriptionAction.rejected, (state, action) => {
        state.subscriptionLoader = false;
        state.error = action.payload;
      })
      .addCase(getCouponID.pending, (state) => {
        state.couponLoader = true;
      })
      .addCase(getCouponID.fulfilled, (state, action) => {
        state.couponLoader = false;
      })
      .addCase(getCouponID.rejected, (state, action) => {
        state.couponLoader = false;
      });
  },
});

export default subscriptionSlice.reducer;
