"use client";
import React, { useEffect } from "react";
import Link from "next/link";
// import LoadingSpinner from "@/components/spinner/LoadingSpinner";
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
import { FaCalendar, FaFileUpload, FaTag } from "react-icons/fa";
import "../../globals.css";
import "./account.css";
import { updateUserProfile, getUserProfileData } from "@/store/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryDropdown } from "react-country-region-selector";
import { userProfileSchema } from "@/schemas/userUpdateProfileSchema";
import { getCookie } from "cookies-next";
import { dashboardStatsAction } from "@/store/dashboard/dashboardThunk";
import { getCustomerInvoices } from "@/actions/stripe/getInvoices";
import { CancelSubscription } from "@/actions/stripe/subscription-cancel";
import { toast } from "react-toastify";

const Account = () => {
  const dispatch = useDispatch();
  const { getProfile, userLoader } = useSelector((state) => state?.user);
  const { states } = useSelector((state) => state.dashboard);
  const [invoices, setInvoices] = useState([]);
  const [lastInvoiceId, setLastInvoiceId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB");
  };

  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;

  const handleCancelSubscription = async (userId, sub_id) => {
    const res = await CancelSubscription(userId, sub_id);

    if (res.success) {
      toast.success("Subscription cancelled successfully");
      return;
    } else !res.success;
    {
      toast.error(res.message);
    }
  };

  const fetchInvoices = async () => {
    try {
      if (!user?.StripeCustomerId) {
        return;
      }
      const customerInvoices = await getCustomerInvoices(
        user?.StripeCustomerId,
        lastInvoiceId
      );
      setInvoices((prevInvoices) => [
        ...prevInvoices,
        ...customerInvoices.data,
      ]);

      if (customerInvoices.data.length > 0) {
        const lastId =
          customerInvoices.data[customerInvoices.data.length - 1].id;
        setLastInvoiceId(lastId);
      }
      setHasMore(customerInvoices.has_more);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

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

  useEffect(() => {
    dispatch(getUserProfileData(user?.UserId));
  }, [user?.UserId]);

  useEffect(() => {
    dispatch(dashboardStatsAction(user?.UserId));
  }, [user?.UserId]);

  useEffect(() => {
    if (user?.UserId) {
      fetchInvoices();
    }
  }, [user?.UserId, user?.stripeCustomerId]);

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

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
      // Update local state if still needed for other reasons
      setPayload({
        ...payload,
        ...profileData,
      });
    }
  }, [getProfile, setValue]);

  const SubmitHanler = (e) => {
    // e.preventDefault();
    dispatch(
      updateUserProfile({
        payload,
        onSuccess: () => {
          // setPayload({
          //   fullName: "",
          //   companyName: "",
          //   email: "",
          //   mobileNumber: "",
          //   postalCode: "",
          //   country: "",
          //   billingEmail: "",
          //   billingLine1: "",
          //   billingLine2: "",
          // });
          dispatch(getUserProfileData(user?.UserId));
          // reset();
        },
      })
    );
  };

  return (
    <>
      {
        <section className="   grid md:grid-cols-2 md:grid-rows-2 gap-x-2 gap-y-3 lg:h-100 p-0">
          <article className="profile bg-gray-100 rounded-3xl row-span-2 p-2 ">
            <div className="">
              <form onSubmit={handleSubmit(SubmitHanler)}>
                <Card>
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
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="border-b border-b-primary bg-white"
                    />
                    {errors.fullName && (
                      <small className="text-red-500">
                        {errors.fullName.message}
                      </small>
                    )}

                    <Input
                      {...register("companyName")}
                      type="text"
                      id="company-name"
                      name="companyName"
                      value={payload?.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="border-b border-b-primary bg-white mt-4"
                    />
                    {errors.companyName && (
                      <small className="text-red-500">
                        {errors.companyName.message}
                      </small>
                    )}
                    <Input
                      {...register("mobileNumber")}
                      type="text"
                      id="mobile-no"
                      value={payload?.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="border-b border-b-primary bg-white mt-4"
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      <small className="text-red-500">
                        {"Country is required"}
                      </small>
                    )}
                    <Input
                      {...register("billingLine1")}
                      type="text"
                      value={payload?.billingLine1}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      placeholder="Postal Code"
                      className="border-b border-b-primary bg-white mt-4"
                    />
                    {errors.postalCode && (
                      <small className="text-red-500">
                        {errors.postalCode.message}
                      </small>
                    )}
                  </CardContent>
                  <CardFooter className="p-1 justify-center mt-2">
                    {/* custom margins for buttons because tw's ain't enough */}
                    <Button
                      disabled={userLoader}
                      className="library-btn basis-1/2 text-sm text-justify  rounded-full bg-primary-light  text-white px-3 py-1 mx-4 "
                    >
                      Update Profile &nbsp;
                      {userLoader && <ImSpinner8 className="spinning-icon" />}
                    </Button>
                    <Button
                    type="button"
                      variant="outline"
                      className="library-btn basis-1/2 text-sm  rounded-full outline outline-1 outline-black text-red-700 px-3 py-1 mx-4  "
                    >
                      Close Account
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </div>
          </article>
          <article className="billing bg-gray-100 rounded-3xl overflow-y-auto row-span-1 ">
            <div className="">
              <div className="">
                <h2 className="card-title text-2xl font-medium tracking-normal py-3 px-6">
                  Billing
                </h2>
              </div>
              <div className=" bar-scroll h-[200px] overflow-auto   px-3 md:px-5">
                <table
                  cellPadding="0"
                  cellpadding="0"
                  className="table border-spacing-0 w-full border-none border-collapse"
                >
                  <thead className="border-none">
                    <tr className="border-none">
                      <th className="border-r-gray-400 border-r-2 rounded-xl">
                        Date
                      </th>
                      <th className="border-r-gray-400 border-r-2">Amount</th>
                      <th className="">Download</th>
                    </tr>
                  </thead>

                  {/* <tbody className="border-none  ">
                    {invoices.map((invoice, index) => (
                      <tr
                        key={`Account-${index}`}
                        className="hover:bg-gray-300 border-none"
                      >
                        <td className="border-r-gray-400 border-r-2">
                          {invoice.date}
                        </td>
                        <td className="border-r-gray-400 border-r-2">
                          {invoice.amount}
                        </td>
                        <td className="text-center">
                          <a href={invoice.download} className="block">
                            <FaFileUpload className="m-auto" color="gray" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                  <tbody className="border-none  ">
                    {invoices?.map((invoice, index) => (
                      <tr
                        key={invoice.id}
                        className="hover:bg-gray-300 border-none"
                      >
                        <td className="border-r-gray-400 border-r-2">
                          {convertTimestampToDate(
                            invoice.status_transitions.paid_at
                          )}
                        </td>
                        <td className="border-r-gray-400 border-r-2">
                          ${invoice.amount_paid / 100}
                        </td>
                        <td className="text-center">
                          <a href={invoice.invoice_pdf} className="block">
                            <FaFileUpload className="m-auto" color="gray" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="  flex justify-center py-2">
                <button className="text-primary font-medium">Load More</button>
              </div> */}
              <div className="flex justify-center py-2">
                {hasMore && (
                  <button
                    onClick={fetchInvoices}
                    className="text-primary font-medium"
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </article>
          <article className="subscription bg-gray-100 rounded-3xl row-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-medium tracking-normal py-3 ">
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="flex ">
                {/* package */}
                <div
                  className=" bg-white mx-2 rounded-2xl basis-1/2 
              flex gap-1 p-1
              "
                >
                  <div className="p-3 rounded-full bg-primary-light w-10 h-10 text-center">
                    <FaTag color="white" />
                  </div>
                  <div className="basis-2/3">
                    <h4 className="font-bold sm:text-sm lg:text-md">
                      {states?.PackageName || 0}
                    </h4>
                    <p className="text-sm">package</p>
                  </div>
                </div>
                {/* renewable date */}
                <div
                  className=" bg-white mx-2 rounded-2xl basis-1/2 
              flex gap-1 p-1
              "
                >
                  <div className="p-3 rounded-full bg-primary-light w-10 h-10 text-center">
                    <FaCalendar color="white" />
                  </div>
                  <div className="basis-2/3">
                    <h4 className="font-bold sm:text-sm lg:text-md">
                      {states?.RenewalDate || 0}
                    </h4>
                    <p className="text-sm">Renewal Date</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex-col ">
                <Button
                  variant="outline"
                  className="rounded-full outline outline-1 outline-black text-primary  h-full w-1/2"
                >
                  <Link href="/main/account/subscriptions">
                    See Subscriptions
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full outline outline-1 outline-black text-red-700 my-2 text-sm h-full w-1/2"
                  onClick={() =>
                    handleCancelSubscription(
                      user?.UserId,
                      "sub_1OmB9OE66tYGrLUMJlBlVrja"
                    )
                  }
                >
                  Cancel Subscriptions
                </Button>
              </CardFooter>
            </Card>
          </article>
        </section>
      }
    </>
  );
};

export default Account;
