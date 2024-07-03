import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-toastify";
export const createLogoAction = createAsyncThunk(
  "logo/createLogo",
  async ({ formData, onSuccess, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        "/User/Update-User-Settings",
        formData
      );
      if (data?.status_code === 200) {
        toast.success(data?.detail);
        onSuccess();
      } else {
        toast.warning(data?.detail);
        // return rejectWithValue(data?.detail);
      }
    } catch (error) {
      if (
        error?.status === 401 &&
        error?.data?.detail === "Could not Validate user."
      ) {
        toast.warning(error?.data?.detail);
        onNotAuthicate();
      }
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const getLogoAction = createAsyncThunk(
  "logo/getLogo",
  async ({UserId,onNotAuthicate}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/User/Get-User-Logo?UserId=${UserId}`
      );
      if (data?.status_code === 200) {
        console.log(data,"its data")
        return data?.detail;
      } else {
        toast.warning(data?.detail);
        // return rejectWithValue(data?.detail);
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

export const UpdateLogoPositionAction = createAsyncThunk(
  "logo/updateLogoPosition",
  async ({ UserId, Position, onSuccess,onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/User/Change-Logo-Display-Settings?UserId=${UserId}&DisplayLogo=${Position}`
      );
      if (data?.status_code === 200) {
        onSuccess();
        toast.success(data?.detail);
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

export const removeUserLogoAction = createAsyncThunk(
  "logo/RemoveUserLogo",
  async ({ UserId, onSuccess,onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `User/Remove-User-Logo?UserId=${UserId}`
      );
      onSuccess();
      if (data?.status_code === 200) {
        toast.success(data?.detail);
      } else {
        toast.warning(data?.detail);
        // return rejectWithValue(data?.detail);
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
