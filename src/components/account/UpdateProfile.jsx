"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//react icons
// import "../../globals.css";
// import "./account.css";
import { updateUserProfile, getUserProfileData } from "@/store/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown } from "react-country-region-selector";
import { userProfileSchema } from "@/schemas/userUpdateProfileSchema";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import CloseAccountModal from "../modals/CloseAccountModal";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { getProfile, userLoader } = useSelector((state) => state?.user);
  let user = JSON.parse(getCookie("user") || "{}");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [payload, setPayload] = useState({
    fullName: "",
    companyName: "",
    mobileNumber: "",
    postalCode: "",
    country: "",
    billingEmail: "",
    billingLine1: "",
    billingLine2: "",
    email: "",
    isAdmin: false,
    userId: user?.UserId,
  });

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  useEffect(() => {
    dispatch(getUserProfileData(user?.UserId));
  }, [user?.UserId]);

  useEffect(() => {
    if (getProfile[0]) {
      if (getProfile[0]?.stripeCustomerId) {
      }
    }
  }, [user?.UserId, getProfile]);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
  });

  useEffect(() => {
    if (getProfile && getProfile.length > 0) {
      const profileData = getProfile[0];
      Object.keys(profileData).forEach((key) => {
        setValue(key, profileData[key]);
      });
      setPayload({
        ...payload,
        ...profileData,
      });
    }
  }, [getProfile, setValue]);

  const SubmitHanler = () => {
    dispatch(
      updateUserProfile({
        payload,
        onSuccess: () => {
          dispatch(getUserProfileData(user?.UserId));
        },
      })
    );
  };
  const inputStyles = {
    border: "none",
    borderBottom: "1px solid #814adf",
    width: "100%",
  };

  const closeAccount = () => {
    setDialogOpen(true);
  };
  const ConfirmCloseHandler = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(SubmitHanler)}>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-medium tracking-normal ">
              Account Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col  p-1 md:p-3">
            <Input
              {...register("fullName")}
              type="text"
              id="name"
              name="fullName"
              value={payload?.fullName}
              onChange={(e) => {
                setPayload({ ...payload, fullName: e.target.value });
              }}
              placeholder="Full Name"
              className="border-b border-b-primary bg-white"
            />
            {errors.fullName && (
              <small className="text-red-500">{errors.fullName.message}</small>
            )}

            <Input
              {...register("companyName")}
              type="text"
              id="company-name"
              name="companyName"
              value={payload?.companyName}
              onChange={(e) => {
                setPayload({ ...payload, companyName: e.target.value });
              }}
              placeholder="Company Name"
              className="border-b border-b-primary bg-white mt-4"
            />
            {errors.companyName && (
              <small className="text-red-500">
                {errors.companyName.message}
              </small>
            )}
            <Controller
              name="mobileNumber"
              control={control}
              defaultValue={payload.mobileNumber}
              render={({ field }) => (
                <PhoneInput
                  {...register("mobileNumber")}
                  {...field}
                  defaultCountry="us"
                  value={payload?.mobileNumber}
                  onChange={(val) => {
                    field.onChange(val);
                    setPayload({ ...payload, mobileNumber: val });
                  }}
                  forceDialCode
                  inputStyle={inputStyles}
                  className="react-international-phone-input2 mt-4 bg-whitee"
                  countrySelectorStyleProps={{
                    buttonStyle: { border: "none" },
                    dropdownStyleProps: {
                      style: { borderRadius: "15px" },
                    },
                  }}
                />
              )}
            />

            {errors.mobileNumber && (
              <small className="text-red-500">
                {errors.mobileNumber.message}
              </small>
            )}
            <Input
              // {...register("email")}
              disabled
              type="email"
              id="email"
              name="email"
              value={payload?.email}
              onChange={(e) => {
                setPayload({ ...payload, email: e.target.value });
              }}
              placeholder="Email Address"
              className="border-b border-b-primary bg-white mt-4"
            />
            {/* {errors.email && (
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
                    )} */}
            <Input
              {...register("billingEmail")}
              type="text"
              id="billing-email"
              value={payload?.billingEmail}
              name="billingEmail"
              onChange={(e) => {
                setPayload({
                  ...payload,
                  billingEmail: e.target.value,
                });
              }}
              placeholder="Billing Email Address"
              className="border-b border-b-primary bg-white mt-4 "
            />
            {errors.billingEmail && (
              <small className="text-red-500">
                {errors.billingEmail.message}
              </small>
            )}
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountryDropdown
                  {...register("country")}
                  className="bg-whitee"
                  {...field}
                  onChange={(val) => {
                    field.onChange(val);
                    setPayload({ ...payload, country: val });
                  }}
                  value={payload?.country}
                  classes="countrySelectTwo"
                />
              )}
            />
            {errors.country && (
              <small className="text-red-500">{"Country is required"}</small>
            )}
            <Input
              {...register("billingLine1")}
              type="text"
              value={payload?.billingLine1}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  billingLine1: e.target.value,
                });
              }}
              id="billing-line-1"
              name="billingLine1"
              placeholder="Billing Line 1"
              className="border-b border-b-primary bg-white mt-4"
            />
            {errors.billingLine1 && (
              <small className="text-red-500">
                {"Billing Line 1 is required"}
              </small>
            )}
            <Input
              {...register("billingLine2")}
              type="text"
              id="billing-line-2"
              name="billingLine2"
              value={payload?.billingLine2}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  billingLine2: e.target.value,
                });
              }}
              placeholder="Billing Line 2"
              className="border-b border-b-primary bg-white mt-4"
            />
            {errors.billingLine2 && (
              <small className="text-red-500">
                {"Billing Line 2 is required"}
              </small>
            )}
            <Input
              {...register("postalCode")}
              type="text"
              id="postal-code"
              name="postalCode"
              value={payload?.postalCode}
              onChange={(e) => {
                setPayload({ ...payload, postalCode: e.target.value });
              }}
              placeholder="Postal Code"
              className="border-b border-b-primary bg-white mt-4"
            />
            {errors.postalCode && (
              <small className="text-red-500">
                {errors.postalCode.message}
              </small>
            )}
          </CardContent>
          <CardFooter className="p-1  justify-center mt-2">
            {/* custom margins for buttons because tw's ain't enough */}
            <Button
              disabled={userLoader}
              className="library-btn   basis-1/2 sm:text-[11px] md:text-sm text-justify  rounded-full bg-primary-light  text-white px-3 md:py-1 mx-4 "
            >
              Update Profile &nbsp;
              {userLoader && <ImSpinner8 className="spinning-icon" />}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="library-btn basis-1/2 sm:text-[11px] md:text-sm   rounded-full outline outline-1 outline-black text-red-700 px-3 py-1 mx-4  "
              onClick={closeAccount}
            >
              Close Account
            </Button>
          </CardFooter>
        </Card>
      </form>

      {isDialogOpen && (
        <CloseAccountModal
          open={isDialogOpen}
          setOpen={handleCloseDialog}
          closeHandler={ConfirmCloseHandler}
          // loader={closeLoader}
        />
      )}
    </>
  );
};

export default UpdateProfile;
