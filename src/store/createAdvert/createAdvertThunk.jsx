import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
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
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);

export const getAdvertAction = createAsyncThunk(
  "advert/getAdvert",
  async ({userId,onSuccess}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Get-Advertisements-By-User-Id/?UserId=${userId}`
      );
      if (data?.status_code === 200) {
        onSuccess();
        return data?.detail.reverse();
      } else {
        return rejectWithValue(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const getAdvertProcesByIdAction = createAsyncThunk(
  "advert/getAdvertProcess",
  async ({Id,onSuccess}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Get-Advertisement-By-Id/?UniqueAdvertId=${Id}`
      );
      if (data?.status_code === 200) {
        onSuccess(data?.detail)
        return data?.detail;
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const downloadAdvertImagesAction = createAsyncThunk(
  "advert/downloadAdvert",
  async (Id, { rejectWithValue }) => {
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
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const downloadAllAdvertImagesAction = createAsyncThunk(
  "advert/downloadAllAdvertImages",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Advertisement/Download-All-Processed-Images?UserId=${payload?.UserId}&UniqueAdvertId=${payload?.UniqueAdvertId}`
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
export const flageImageAction = createAsyncThunk(
  "advert/flageImage",
  async ({payload,onSuccess}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/FlaggedImages/Flag-Image?AdvertId=${payload?.AdvertId}&UniqueImageId=${payload?.UniqueImageId}`
      );
      if (data?.status_code === 200) {
        toast.success("Image Successfully flaged");
        onSuccess();
      } else {
        toast.warning(data?.detail)
        return rejectWithValue(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);

export const downloadZipFileAction = createAsyncThunk(
  "advert/downloadZip",
  async (path, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/get-file?filename=${path}`);
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
export const getActivityChartAction = createAsyncThunk(
  "advert/getActivity",
  async (UserId, { rejectWithValue }) => {
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
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const getFileAction = createAsyncThunk(
  "advert//Get-File-URL",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/Get-File-URL`,payload
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

export const changeLogoPositionOnProcessImage = createAsyncThunk(
  "flage/Update-Advertisement-Image",
  async ({ formData, onSuccess }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/Advertisement/Update-Advertisement-Image`,formData);
      if (data?.status_code === 200) {
        onSuccess();
        // toast.success(data?.detail);
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);

