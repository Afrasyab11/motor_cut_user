import { createSlice } from "@reduxjs/toolkit";
import { createLogoAction, getLogoAction, removeUserLogoAction } from "./logoThunk";

const initialState = {
  logoLoader: false,
  getLogoLoader:false,
  removeLogoLoader:false,
  error: null,
  logo: [],
};

export const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    // Your synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLogoAction.pending, (state) => {
        state.logoLoader = true;
      })
      .addCase(createLogoAction.fulfilled, (state, action) => {
        state.logoLoader = false;
      })
      .addCase(createLogoAction.rejected, (state, action) => {
        state.logoLoader = false;
        state.error = action.payload;
      })
      .addCase(getLogoAction.pending, (state) => {
        state.getLogoLoader = true;
      })
      .addCase(getLogoAction.fulfilled, (state, action) => {
        state.getLogoLoader = false;
        state.logo = action.payload;
      })
      .addCase(getLogoAction.rejected, (state, action) => {
        state.getLogoLoader = false;
        state.error = action.payload;
      })
      .addCase(removeUserLogoAction.pending, (state) => {
        state.removeLogoLoader = true;
      })
      .addCase(removeUserLogoAction.fulfilled, (state, action) => {
        state.removeLogoLoader = false;
        state.logo = action.payload;
      })
      .addCase(removeUserLogoAction.rejected, (state, action) => {
        state.removeLogoLoader = false;
        state.error = action.payload;
      });
  },
});

export default logoSlice.reducer;
