import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-toastify";
//this API use for Dashboard stats,
export const dashboardStatsAction = createAsyncThunk(
  "advert/dashboardStats",
  async (UserId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/User/User-Stats?UserId=${UserId}`
      );
      if (data?.status_code === 200) {
        return data?.detail;
      } else {
        // toast.warning(data?.detail)
        return rejectWithValue(data?.detail); 
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);


