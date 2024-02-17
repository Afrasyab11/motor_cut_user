import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptionAction } from "./subscriptionThunk";

const initialState = {
  subscriptionLoader: false,
  error: null,
  subscription: [],
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
      });
  },
});

export default subscriptionSlice.reducer;
