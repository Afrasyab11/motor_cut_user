import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginPayload, onSuccess, onError }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/User/Login", loginPayload);
      if (data.status_code == 200) {
        onSuccess();
        return data;
      } else {
        toast.warning(data?.detail);
        onError(data.detail);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const sendSignUpOTP = createAsyncThunk(
  "user/sendSignUpOTP",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/User/Send-Verfication-OTP",
        payload
      );
      if (data.status_code == 200) {
        onSuccess();
        return data;
      } else {
        onError(data?.detail);
        // toast.error(response.response.data.message);
        // return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/User/Verify-SignUp-OTP",
        payload
      );
      if (data.status_code == 200) {
        onSuccess();
        return data;
      } else {
        onError(data.detail);
        // toast.error(response.response.data.message);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/User/SignUp", payload);
      if (data.status_code == 200) {
        toast.success("User Registered Successfully...!");
        onSuccess();
        return data;
      } else {
        onError(data.detail);
        // toast.error(response.response.data.message);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      onError(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ payload, onSuccess, onNotAuthicate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        "/User/Update-User-Profile",
        payload
      );
      if (data?.status_code === 200) {
        onSuccess();
        toast.success("Successfully Updated Profile");
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

export const forgotUserPassword = createAsyncThunk(
  "user/forgotUserPassword",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/User/Get-Password-Reset-OTP",
        payload
      );
      if (data.status_code == 200) {
        toast.success(data.detail);
        onSuccess(data.detail);
        return data.detail;
      } else {
        onError(data.detail);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const verifyUserPassword = createAsyncThunk(
  "user/verifyUserPassword",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      console.log("coming");
      const { data } = await axiosInstance.post(
        "/User/Verify-Password-Reset-OTP",
        payload
      );
      if (data.status_code == 200) {
        onSuccess();
        return data.detail;
      } else {
        onError(data.detail);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userNewPassword = createAsyncThunk(
  "user/userNewPassword",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      console.log("coming");
      const { data } = await axiosInstance.post(
        "/User/Reset-Password",
        payload
      );
      if (data.status_code == 200) {
        toast.success(data.detail);
        onSuccess();
        return data.detail;
      } else {
        onError(data.detail);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserProfileData = createAsyncThunk(
  "user/getProfileData",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/User/Get-User-By-Id?UserId=${id}`
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
export const statusManageUserAction = createAsyncThunk(
  "manage/statusUser",
  async ({ UserId, Status, onSuccess }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/User/User-Status-Change?UserId=${UserId}&Status=${Status}`
      );
      if (data?.status_code === 200) {
        onSuccess();
        toast.success("Account has been closed");
      } else {
        toast.warning(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
