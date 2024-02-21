import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-toastify";

export const getSubscriptionAction = createAsyncThunk(
  "subscrition/getSubscription",
  async (currency, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Packages/Get-All-Packages-By-Currency?Currency=${currency}`
      );
      if (data?.status_code === 200) {
        return data?.detail;
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
