import { createSlice } from "@reduxjs/toolkit";
import {
  createAdvertAction,
  getAdvertAction,
  getAdvertProcesByIdAction,
  getActivityChartAction,
} from "./createAdvertThunk";

const initialState = {
  advertLoader: false,
  chartLoader:false,
  error: null,
  advert: [],
  processAdvert: [],
  activity:[]
};

export const advertSlice = createSlice({
  name: "advert",
  initialState,
  reducers: {
    // Your synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdvertAction.pending, (state) => {
        state.advertLoader = true;
      })
      .addCase(createAdvertAction.fulfilled, (state, action) => {
        state.advertLoader = false;
      })
      .addCase(createAdvertAction.rejected, (state, action) => {
        state.advertLoader = false;
        state.error = action.payload;
      })
      .addCase(getAdvertAction.pending, (state) => {
        state.advertLoader = true;
      })
      .addCase(getAdvertAction.fulfilled, (state, action) => {
        state.advertLoader = false;
        state.advert = action.payload;
      })
      .addCase(getAdvertAction.rejected, (state, action) => {
        state.advertLoader = false;
        state.error = action.payload;
      })
      .addCase(getAdvertProcesByIdAction.pending, (state) => {
        state.advertLoader = true;
      })
      .addCase(getAdvertProcesByIdAction.fulfilled, (state, action) => {
        state.advertLoader = false;
        state.processAdvert = action.payload;
      })
      .addCase(getAdvertProcesByIdAction.rejected, (state, action) => {
        state.advertLoader = false;
        state.error = action.payload;
      })
      .addCase(getActivityChartAction.pending, (state) => {
        state.chartLoader = true;
      })
      .addCase(getActivityChartAction.fulfilled, (state, action) => {
        state.chartLoader = false;
        state.activity = action.payload;
      })
      .addCase(getActivityChartAction.rejected, (state, action) => {
        state.chartLoader = false;
        state.error = action.payload;
      })
     
    
  },
});

export default advertSlice.reducer;
