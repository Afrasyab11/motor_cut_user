// import { createSlice } from "@reduxjs/toolkit";

// import { verifyEmail, loginUser, getUserFirstTimeStatus,changeUserFirstTimeStatus,updateUserProfile, registerUser, sendSignUpOTP, logout, forgotUserPassword, verifyUserPassword, userNewPassword,getUserProfileData,statusManageUserAction} from "./userThunk";
// import { setCookie, deleteCookie } from "cookies-next";

// const initialState = {
//   user: null,
//   occupationList: [],
//   isLoading: false,
//   isSidebarOpen: false,
//   isProfileUpdating: false,
//   insurancePolicy: {},
//   isEmailUpdating: false,
//   token: null,
//   userLoader: false,
//   rememberMe:false,
//   statusError:[],
//   getProfile:[],
//   getProfileLoader:false,
//   closeAccountLoader:false,
//   firstTimeStatus: null, // New state for first-time status
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     toggleSidebar: (state) => {
//       state.isSidebarOpen = !state.isSidebarOpen;
//     },
//     toggleRememberMe: (state) => {
//       state.rememberMe = !state.rememberMe;
//     },
//     logoutUser: (state) => {
//       deleteCookie("token");
//       deleteCookie("user");
//       state.token = null;
//       state.user = null;
//     },
    
//   },

//   extraReducers: (builder) => {
//     builder
//     .addCase(loginUser.pending, (state, action) => {
//       state.isLoading = true;
//     })
//     .addCase(loginUser.fulfilled, (state, action) => {
//       state.user = action?.payload?.detail;
//       state.token = action?.payload?.detail?.AccessToken;
//       setCookie("user", action?.payload?.detail);
//       setCookie("token", action?.payload?.detail?.AccessToken);
//       setCookie("rememberMe", state?.rememberMe);
//       state.isLoading = false;
//     })
//     .addCase(loginUser.rejected, (state, action) => {
//       console.error("Login rejected payload:", action.payload);
//       state.isLoading = false;
//     })

//     .addCase(getUserFirstTimeStatus.pending, (state) => {
//       state.isLoading = true;
//     })
//     .addCase(getUserFirstTimeStatus.fulfilled, (state, action) => {
//       state.firstTimeStatus = action?.payload?.detail;
//       state.isLoading = false;
//     })
//     .addCase(getUserFirstTimeStatus.rejected, (state) => {
//       state.isLoading = false;
//     })
//     .addCase(changeUserFirstTimeStatus.pending, (state) => {
//       state.isLoading = true;
//     })
//     .addCase(changeUserFirstTimeStatus.fulfilled, (state) => {
//       state.firstTimeStatus = false;
//       state.isLoading = false;
//     })
//     .addCase(changeUserFirstTimeStatus.rejected, (state) => {
//       state.isLoading = false;
//     })

//       .addCase(updateUserProfile.pending, (state) => {
//         state.userLoader = true;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.userLoader = false;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.userLoader = false;
//         state.error = action.payload;
//       })

//       //signUp otp User

//       .addCase(sendSignUpOTP.pending, (state, action) => {
//         state.isLoading = true;
//       })

//       .addCase(sendSignUpOTP.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.statusError=action?.payload;
//       })

//       .addCase(sendSignUpOTP.rejected, (state, action) => {
//         // toast.error(action.payload?.data?.message);
//         state.isLoading = false;
//       })

//       /////  verify Email
//       .addCase(verifyEmail.pending, (state, action) => {
//         state.isLoading = true;
//       })

//       .addCase(verifyEmail.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })

//       .addCase(verifyEmail.rejected, (state, action) => {
//         // toast.error(action.payload?.data?.message);
//         state.isLoading = false;
//       })

//       //Register User

//       .addCase(registerUser.pending, (state, action) => {
//         state.isLoading = true;
//       })

//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })

//       .addCase(registerUser.rejected, (state, action) => {
//         // toast.error(action.payload?.data?.message);
//         state.isLoading = false;
//       })


//       // Forgot Password OTP

//       .addCase(forgotUserPassword.pending, (state) => {
//         state.userLoader = true;
//       })
//       .addCase(forgotUserPassword.fulfilled, (state, action) => {
//         state.userLoader = false;
//       })
//       .addCase(forgotUserPassword.rejected, (state, action) => {
//         state.userLoader = false;
//         state.error = action.payload;
//       })
//       //User Profile data Getting for Account page
//       .addCase(getUserProfileData.pending, (state) => {
//         state.getProfileLoader = true;
//       })
//       .addCase(getUserProfileData.fulfilled, (state, action) => {
//         state.getProfileLoader = false;
//         state.getProfile=action?.payload
//       })
//       .addCase(getUserProfileData.rejected, (state, action) => {
//         state.getProfileLoader = false;
//         state.error = action.payload;
//       })

//       // Reset Password OTP
//       .addCase(verifyUserPassword.pending, (state) => {
//         state.userLoader = true;
//       })
//       .addCase(verifyUserPassword.fulfilled, (state, action) => {
//         state.userLoader = false;
//       })
//       .addCase(verifyUserPassword.rejected, (state, action) => {
//         state.userLoader = false;
//         state.error = action.payload;
//       })

//       .addCase(userNewPassword.pending, (state) => {
//         state.userLoader = true;
//       })
//       .addCase(userNewPassword.fulfilled, (state, action) => {
//         state.userLoader = false;
//       })
//       .addCase(userNewPassword.rejected, (state, action) => {
//         state.userLoader = false;
//         state.error = action.payload;
//       })
//       //Close Account API 
//       .addCase(statusManageUserAction.pending, (state) => {
//         state.closeAccountLoader = true;
//       })
//       .addCase(statusManageUserAction.fulfilled, (state, action) => {
//         state.closeAccountLoader = false;
//       })
//       .addCase(statusManageUserAction.rejected, (state, action) => {
//         state.closeAccountLoader = false;
//         state.error = action.payload;
//       })

//   },
  
// });

// export const { toggleSidebar, logoutUser,toggleRememberMe } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
    verifyEmail, loginUser, getUserFirstTimeStatus, changeUserFirstTimeStatus, updateUserProfile, 
    registerUser, sendSignUpOTP, logout, forgotUserPassword, verifyUserPassword, userNewPassword, 
    getUserProfileData, statusManageUserAction
} from "./userThunk";
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
    rememberMe: false,
    statusError: [],
    getProfile: [],
    getProfileLoader: false,
    closeAccountLoader: false,
    firstTimeStatus: null,
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
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const userDetail = action?.payload?.detail;
                state.user = userDetail;
                state.token = userDetail?.AccessToken;
                // setCookie("user", userDetail);
                document.cookie = `user=${encodeURIComponent(JSON.stringify(userDetail))}; path=/; max-age=3600`;
                document.cookie = `token=${userDetail?.AccessToken}; path=/; max-age=3600`;
                // setCookie("token", userDetail?.AccessToken);
                setCookie("rememberMe", state?.rememberMe);
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error("Login rejected payload:", action.payload);
                state.isLoading = false;
            })
            .addCase(getUserFirstTimeStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserFirstTimeStatus.fulfilled, (state, action) => {
                state.firstTimeStatus = action?.payload?.detail;
                state.isLoading = false;
            })
            .addCase(getUserFirstTimeStatus.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(changeUserFirstTimeStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeUserFirstTimeStatus.fulfilled, (state) => {
                state.firstTimeStatus = false;
                state.isLoading = false;
            })
            .addCase(changeUserFirstTimeStatus.rejected, (state) => {
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
            .addCase(sendSignUpOTP.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendSignUpOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.statusError = action?.payload;
            })
            .addCase(sendSignUpOTP.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotUserPassword.pending, (state) => {
                state.userLoader = true;
            })
            .addCase(forgotUserPassword.fulfilled, (state) => {
                state.userLoader = false;
            })
            .addCase(forgotUserPassword.rejected, (state) => {
                state.userLoader = false;
                state.error = action.payload;
            })
            .addCase(getUserProfileData.pending, (state) => {
                state.getProfileLoader = true;
            })
            .addCase(getUserProfileData.fulfilled, (state, action) => {
                state.getProfileLoader = false;
                state.getProfile = action?.payload;
            })
            .addCase(getUserProfileData.rejected, (state) => {
                state.getProfileLoader = false;
                state.error = action.payload;
            })
            .addCase(verifyUserPassword.pending, (state) => {
                state.userLoader = true;
            })
            .addCase(verifyUserPassword.fulfilled, (state) => {
                state.userLoader = false;
            })
            .addCase(verifyUserPassword.rejected, (state) => {
                state.userLoader = false;
                state.error = action.payload;
            })
            .addCase(userNewPassword.pending, (state) => {
                state.userLoader = true;
            })
            .addCase(userNewPassword.fulfilled, (state) => {
                state.userLoader = false;
            })
            .addCase(userNewPassword.rejected, (state) => {
                state.userLoader = false;
                state.error = action.payload;
            })
            .addCase(statusManageUserAction.pending, (state) => {
                state.closeAccountLoader = true;
            })
            .addCase(statusManageUserAction.fulfilled, (state) => {
                state.closeAccountLoader = false;
            })
            .addCase(statusManageUserAction.rejected, (state) => {
                state.closeAccountLoader = false;
                state.error = action.payload;
            });
    },
});

export const { toggleSidebar, logoutUser, toggleRememberMe } = userSlice.actions;

export default userSlice.reducer;
