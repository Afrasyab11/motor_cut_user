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
import { updateUserProfile, getUserProfileData, statusManageUserAction } from "@/store/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown } from "react-country-region-selector";
import { userProfileSchema } from "@/schemas/userUpdateProfileSchema";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { PhoneInput,defaultCountries,parseCountry } from "react-international-phone";
import "react-international-phone/style.css";
import CloseAccountModal from "../modals/CloseAccountModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { logoutUser } from "@/store/user/userSlice";
const countriesList = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
];

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getProfile, userLoader,closeAccountLoader } = useSelector((state) => state?.user);
  let user = JSON.parse(getCookie("user") || "{}");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [payload, setPayload] = useState({
    fullName: "",
    companyName: "",
    mobileNumber: "",
    postalCode: "",
    country: "",
    billingEmail: "",
    address:"",
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
    // Filter out empty values from the payload object
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([key, value]) => value !== "" && value !== null
      )
    );
    dispatch(
      updateUserProfile({
        payload: filteredPayload,
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
    dispatch(
      statusManageUserAction({
        UserId: user?.UserId,
        Status: "Inactive",
        onSuccess: () => {
          setDialogOpen(false);
          dispatch(logoutUser());
          router.push("/auth/login");
        },
      })
    );
  };

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['us', 'gb'].includes(iso2);
  });
  
  return (
    <>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-medium tracking-normal ">
            Account Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col  p-1 md:p-3">
          <Input
            // {...register("fullName")}
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
          <Input
            // {...register("companyName")}
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
        
          <Controller
            name="mobileNumber"
            control={control}
            defaultValue={payload.mobileNumber}
            render={({ field }) => (
              <PhoneInput
                // {...register("mobileNumber")}
                {...field}
                defaultCountry="us"
                value={payload?.mobileNumber}
                onChange={(val) => {
                  field.onChange(val);
                  setPayload({ ...payload, mobileNumber: val });
                }}
                countries={countries}
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

          {/* <Input
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
          /> */}

          <Input
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
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="border-none w-full"
                onValueChange={(val) => {
                  field.onChange(val);
                  setPayload({ ...payload, country: val });
                }}
              >
                <SelectTrigger className="w-full h-10 mt-4 border-b border-primary-dark bg-site_secondary">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countriesList.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {`${country.name} (${country.code})`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Input
            type="text"
            value={payload?.address}
            onChange={(e) => {
              setPayload({
                ...payload,
                address: e.target.value,
              });
            }}
            id="address"
            name="address"
            placeholder="address"
            className="border-b border-b-primary bg-white mt-4"
          />

          {/* <Input
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
          /> */}

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

        </CardContent>
        <CardFooter className="p-1  justify-center mt-2">
          <Button
            type="button"
            disabled={userLoader}
            onClick={SubmitHanler}
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

      {isDialogOpen && (
        <CloseAccountModal
          open={isDialogOpen}
          setOpen={handleCloseDialog}
          closeHandler={ConfirmCloseHandler}
          loader={closeAccountLoader}
        />
      )}
    </>
  );
};

export default UpdateProfile;
