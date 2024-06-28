import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-toastify";

export const getSubscriptionAction = createAsyncThunk(
  "subscrition/getSubscription",
  async ({currency,onNotAuthicate}, { rejectWithValue }) => {
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
      if (
        error?.status === 401 &&
        error?.data?.detail === "Could not Validate user."
      ) {
        // toast.warning(error?.data?.detail);
        onNotAuthicate();
      }
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);


export const getCouponID = createAsyncThunk(
  "subscrition/getCouponID",
  async ({couponCode,onSuccess,onError}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Discounts/Get-Stripe-Coupon-Id?DiscountCode=${couponCode}`
      );
      if (data?.status_code === 200) {
        onSuccess(data?.detail)
        return data?.detail;
      } else {
        onError(data?.detail)
        console.error(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);
export const cancelSubscriptionAction = createAsyncThunk(
  "subscrition/cancelSubscription",
  async ({payload,onSuccess}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `Subscriptions/Cancel-Subscription`,payload);
      if (data?.status_code === 200) {
        onSuccess(data?.detail);
        return data?.detail;
      } else {
        console.error(data?.detail);
      }
    } catch (error) {
      return rejectWithValue(error.message); // Handle the error state in Redux
    }
  }
);

