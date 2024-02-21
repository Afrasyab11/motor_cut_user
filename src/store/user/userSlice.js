import { createSlice } from "@reduxjs/toolkit";

import { verifyEmail, loginUser, updateUserProfile, registerUser, sendSignUpOTP, logout, forgotUserPassword, verifyUserPassword, userNewPassword,getUserProfileData} from "./userThunk";
import { setCookie, deleteCookie } from "cookies-next";

const initialState = {
  user: null,
  occupationList: [],
  isLoading: false,
  isSidebarOpen: false,
  isProfileUpdating: false,
  insurancePolicy: {},
  isEmailUpdating: false,
  token: null,
  userLoader: false,
  rememberMe:false,
  statusError:[],
  getProfile:[],
  getProfileLoader:false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
    logoutUser: (state) => {
      deleteCookie("token");
      deleteCookie("user");
      state.token = null;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload.detail;
          state.token = action.payload.detail.AccessToken;
          setCookie("user", action.payload.detail);
          setCookie("token", action.payload.detail.AccessToken);
          setCookie("rememberMe", state.rememberMe)
          

         state.isLoading = false;
         
      })

      .addCase(loginUser.rejected, (state, action) => {
        // toast.error(action.payload?.data?.message);
        state.isLoading = false;
      })


      .addCase(updateUserProfile.pending, (state) => {
        state.userLoader = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userLoader = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userLoader = false;
        state.error = action.payload;
      })

      //signUp otp User

      .addCase(sendSignUpOTP.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(sendSignUpOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statusError=action?.payload;
      })

      .addCase(sendSignUpOTP.rejected, (state, action) => {
        // toast.error(action.payload?.data?.message);
        state.isLoading = false;
      })

      /////  verify Email
      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(verifyEmail.rejected, (state, action) => {
        // toast.error(action.payload?.data?.message);
        state.isLoading = false;
      })

      //Register User

      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        // toast.error(action.payload?.data?.message);
        state.isLoading = false;
      })


      // Forgot Password OTP

      .addCase(forgotUserPassword.pending, (state) => {
        state.userLoader = true;
      })
      .addCase(forgotUserPassword.fulfilled, (state, action) => {
        state.userLoader = false;
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.userLoader = false;
        state.error = action.payload;
      })
      //User Profile data Getting for Account page
      .addCase(getUserProfileData.pending, (state) => {
        state.getProfileLoader = true;
      })
      .addCase(getUserProfileData.fulfilled, (state, action) => {
        state.getProfileLoader = false;
        state.getProfile=action?.payload
      })
      .addCase(getUserProfileData.rejected, (state, action) => {
        state.getProfileLoader = false;
        state.error = action.payload;
      })

      // Reset Password OTP
      .addCase(verifyUserPassword.pending, (state) => {
        state.userLoader = true;
      })
      .addCase(verifyUserPassword.fulfilled, (state, action) => {
        state.userLoader = false;
      })
      .addCase(verifyUserPassword.rejected, (state, action) => {
        state.userLoader = false;
        state.error = action.payload;
      })

      .addCase(userNewPassword.pending, (state) => {
        state.userLoader = true;
      })
      .addCase(userNewPassword.fulfilled, (state, action) => {
        state.userLoader = false;
      })
      .addCase(userNewPassword.rejected, (state, action) => {
        state.userLoader = false;
        state.error = action.payload;
      })

  },
  
});

export const { toggleSidebar, logoutUser,toggleRememberMe } = userSlice.actions;

export default userSlice.reducer;
