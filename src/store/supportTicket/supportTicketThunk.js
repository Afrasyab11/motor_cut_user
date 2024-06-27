import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";

export const createSupportTicketAction = createAsyncThunk(
  "supportTicket/createSupportTicket",
  async ({ formData, onSuccess, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/Support-Ticket/Create-Ticket",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data?.status_code === 200) {
        onSuccess(response.data);
        return response.data;
      } else {
        return rejectWithValue(response.data?.detail);
      }
    } catch (error) {
      if (
        error?.status === 401 &&
        error?.data?.detail === "Could not Validate user."
      ) {
        toast.warning(error?.data?.detail);
        onNotAuthicate();
      }
      return rejectWithValue(error.message);
    }
  }
);
