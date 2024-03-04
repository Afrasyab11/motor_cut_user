import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { dashboardStatsAction } from "./dashboardThunk";

const initialState = {
  user: null,
  occupationList: [],
  isLoading: false,
  isSidebarOpen: false,
  isProfileUpdating: false,
  insurancePolicy: {},
  isEmailUpdating: false,
  token: null,
  states:[],
  statsLoader:false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(dashboardStatsAction.pending, (state) => {
      state.statsLoader = true;
    })
    .addCase(dashboardStatsAction.fulfilled, (state, action) => {
      state.statsLoader = false;
      state.states = action.payload;
    })
    .addCase(dashboardStatsAction.rejected, (state, action) => {
      state.statsLoader = false;
      state.error = action.payload;
    })


  },
});



export default dashboardSlice.reducer;
