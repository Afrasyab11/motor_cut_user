import { createSlice } from "@reduxjs/toolkit";
import { createSupportTicketAction } from "./supportTicketThunk";

const initialState = {
  supportTicketLoader: false,
  error: null,
  supportTicket: null,
};

export const supportTicketSlice = createSlice({
  name: "supportTicket",
  initialState,
  reducers: {
    // synchronous reducers 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupportTicketAction.pending, (state) => {
        state.supportTicketLoader = true;
      })
      .addCase(createSupportTicketAction.fulfilled, (state, action) => {
        state.supportTicketLoader = false;
        state.supportTicket = action.payload;
        
        
      })
      .addCase(createSupportTicketAction.rejected, (state, action) => {
        state.supportTicketLoader = false;
        state.error = action.payload;
      });
  },
});


export default supportTicketSlice.reducer;
