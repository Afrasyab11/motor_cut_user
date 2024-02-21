import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-toastify";
export const createLogoAction = createAsyncThunk(
  "logo/createLogo",
  async ({ formData, onSuccess }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        "/User/Update-User-Settings",
        formData
      );
      if (data?.status_code === 200) {
        onSuccess();
        toast.success("Logo successfully Uploaded");
      } else {
        toast.warning(data?.detail);
        // return rejectWithValue(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const getLogoAction = createAsyncThunk(
  "logo/getLogo",
  async (UserId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/User/Get-User-Logo?UserId=${UserId}`
      );
      if (data?.status_code === 200) {
        return data?.detail;
      } else {
        toast.warning(data?.detail);
        // return rejectWithValue(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);

export const UpdateLogoPositionAction = createAsyncThunk(
  "logo/updateLogoPosition",
  async ({ UserId, Position, onSuccess }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/User/Change-Logo-Display-Settings?UserId=${UserId}&DisplayLogo=${Position}`
      );
      if (data?.status_code === 200) {
        onSuccess();
        toast.success("Logo Position Successfully Updated");
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
