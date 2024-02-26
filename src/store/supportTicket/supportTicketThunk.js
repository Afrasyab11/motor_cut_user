import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";

export const createSupportTicketAction = createAsyncThunk(
    "supportTicket/createSupportTicket",
    async ({ formData, onSuccess }, { rejectWithValue }) => {
      try {
       
        const response = await axiosInstance.post(
          "/Support-Ticket/Create-Ticket",
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
          }
        );
        if (response.data?.status_code === 200) {
          onSuccess(response.data);
          return response.data;
        } else {
          return rejectWithValue(response.data?.detail);
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  