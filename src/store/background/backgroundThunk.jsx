import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-toastify";
export const channgeBackgroundImageAction = createAsyncThunk(
  "background/changeBackgroundImage",
  async ({ list, formData, onSuccess }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/User/Change-User-Background-Image?UserId=${list.UserId}&Path=${list?.Path}`,
        formData
      );
      if (data?.status_code === 200) {
        toast.success("Background image successfully Changed");
        onSuccess(); 
      } else {
        toast.warning(data.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const getchanngeBackgroundImageAction = createAsyncThunk(
  "background/getBackgroundImage",
  async (Id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/User/Show-User-Background-Image?UserId=${Id}`
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
export const getAllBackgroundImagesAction = createAsyncThunk(
  "background/getAllBackgroundImages",
  async (rejectWithValue) => {
    try {
      const { data } = await axiosInstance.get(
        "/Backgrounds/Get-All-Backgrounds"
      );
      if (data?.status_code === 200) {
        return data?.detail?.reverse();
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
