import { createSlice } from "@reduxjs/toolkit";
import {
  channgeBackgroundImageAction,
  getchanngeBackgroundImageAction,
  getAllBackgroundImagesAction
} from "./backgroundThunk";

const initialState = {
  backgroundLoader: false,
  getBackgroundLoader:false,
  error: null,
  background: [],
  getUserBgImage:[],
  allBackground:[],

};

export const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    // Your synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(channgeBackgroundImageAction.pending, (state) => {
        state.backgroundLoader = true;
      })
      .addCase(channgeBackgroundImageAction.fulfilled, (state, action) => {
        state.backgroundLoader = false;
      })
      .addCase(channgeBackgroundImageAction.rejected, (state, action) => {
        state.backgroundLoader = false;
        state.error = action.payload;
      })
      .addCase(getchanngeBackgroundImageAction.pending, (state) => {
        state.getBackgroundLoader = true;
      })
      .addCase(getchanngeBackgroundImageAction.fulfilled, (state, action) => {
        state.getBackgroundLoader = false;
        state.background = action.payload;
      })
      .addCase(getchanngeBackgroundImageAction.rejected, (state, action) => {
        state.getBackgroundLoader = false;
        state.error = action.payload;
      })
      .addCase(getAllBackgroundImagesAction.pending, (state) => {
        state.backgroundLoader = true;
      })
      .addCase(getAllBackgroundImagesAction.fulfilled, (state, action) => {
        state.backgroundLoader = false;
        state.allBackground = action.payload;
      })
      .addCase(getAllBackgroundImagesAction.rejected, (state, action) => {
        state.backgroundLoader = false;
        state.error = action.payload;
      });
  },
});

export default backgroundSlice.reducer;
