import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
//this API use for Dashboard stats,
export const dashboardStatsAction = createAsyncThunk(
  "advert/dashboardStats",
  async ({ UserId, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/User/User-Stats?UserId=${UserId}`
      );
      if (data?.status_code === 200) {
        return data?.detail;
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      if (
        error?.status === 401 &&
        error?.data?.detail === "Could not Validate user."
      ) {
        onNotAuthicate();
      }
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
