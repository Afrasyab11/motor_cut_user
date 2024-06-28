import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createAdvertAction = createAsyncThunk(
  "advert/createAdvert",
  async ({ formData, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/Advertisement/Create-Advertisement/",
        formData
      );
      if (data?.status_code === 200) {
        toast.success("Advert Created Successfully");
        onSuccess();
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      if (
        error?.status === 401 &&
        error?.data?.detail === "Could not Validate user."
      ) {
        toast.warning(error?.data?.detail);
        onError();
      }
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);

export const getAdvertAction = createAsyncThunk(
  "advert/getAdvert",
  async ({ userId, onSuccess, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Get-Advertisements-By-User-Id/?UserId=${userId}`
      );
      console.log("data0000", data);
      if (data?.status_code === 200) {
        onSuccess();
        return data?.detail.reverse();
      } else {
        return rejectWithValue(data?.detail);
      }
    } catch (error) {
      console.log("errooor79", error);
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
export const getAdvertProcesByIdAction = createAsyncThunk(
  "advert/getAdvertProcess",
  async ({ Id, onSuccess, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Get-Advertisement-By-Id/?UniqueAdvertId=${Id}`
      );
      if (data?.status_code === 200) {
        onSuccess(data?.detail);
        return [data?.detail];
      } else {
        toast.warning(data?.detail);
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
export const downloadAdvertImagesAction = createAsyncThunk(
  "advert/downloadAdvert",
  async ({ Id, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Download-Advertisement-Images/?UniqAdvertId=${Id}`
      );
      if (data?.status_code === 200) {
        return data?.detail;
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      console.log("error",error)
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
export const flageImageAction = createAsyncThunk(
  "advert/flageImage",
  async ({ payload, onSuccess, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/FlaggedImages/Flag-Image?AdvertId=${payload?.AdvertId}&UniqueImageId=${payload?.UniqueImageId}`
      );
      if (data?.status_code === 200) {
        toast.success("Image Successfully flaged");
        onSuccess();
      } else {
        toast.warning(data?.detail);
        return rejectWithValue(data?.detail);
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

export const getActivityChartAction = createAsyncThunk(
  "advert/getActivity",
  async ({ UserId, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Get-All-User-Adverts-Created-With-Date?UserId=${UserId}`
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

export const changeLogoPositionOnProcessImage = createAsyncThunk(
  "flage/Update-Advertisement-Image",
  async ({ formData, onSuccess,onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/Advertisement/Update-Advertisement-Image`,
        formData
      );
      if (data?.status_code === 200) {
        onSuccess();
        // toast.success(data?.detail);
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
