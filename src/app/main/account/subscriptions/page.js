"use client";
import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import UK from "./../../../../../public/UK.png";
import USA from "./../../../../../public/USA.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { setCookie } from "cookies-next";

import {
  CreateStripeCheckoutSession,
  checkPromoCode,
} from "@/actions/stripe/checkout-session";
import getStripe from "@/utils/get-stripe";
import {
  getCouponID,
  getSubscriptionAction,
} from "@/store/subscription/subscriptionThunk";
import { IoCheckbox } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
// import "./subscriptions.module.css";
const Subscriptions = [
  {
    features: [
      "160 Monthly Image Credits",
      "Custom Background",
      "Dedicated Account Support",
      "Mobile App Access",
      "Custom Branding",
      "2GB Image Storage",
    ],
  },
];
const Subscription = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useSelector((state) => state?.user);
  const { couponLoader } = useSelector((state) => state?.subscription);
  const { subscription, subscriptionLoader } = useSelector(
    (state) => state?.subscription
  );
  const [currency, setCurrency] = useState("GBP");
  const [couponCodeID, setCouponCodeID] = useState("");
  console.log("couponCodeID: ", couponCodeID);

  let userString = getCookie("user");
  let userInfo = userString ? JSON.parse(userString) : null;

  const [promoCode, setPromoCode] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedApply, setSelectedApply] = useState("");

  const userEmail = userInfo?.UserEmail;
  const userId = userInfo?.UserId;
  const authToken = userInfo?.AccessToken;
  const userName = userInfo?.UserName;
  const [loader, setLoader] = useState(true);
  console.log("userIfO", userInfo);
  useEffect(() => {
    dispatch(getSubscriptionAction(currency));
  }, [currency]);
  useEffect(() => {
    setTimeout(() => {
      if (subscription.length != 0) {
        setLoader(false);
      } else {
        setLoader(false);
      }
    }, 1000);
  }, [subscription]);
  const UKChangeHanler = (e) => {
    e.preventDefault();
    setCurrency("GBP");
    dispatch(getSubscriptionAction("GBP"));
    setPromoCode({});
    setError("");
    setSuccess("");
    setErrorMessages({});
  };
  const USAChangeHanler = (e) => {
    e.preventDefault();
    setCurrency("USD");
    dispatch(getSubscriptionAction("USD"));
    setPromoCode({});
    setError("");
    setSuccess("");
    setErrorMessages({});
  };

  const handlePromo = (index) => {
    setError("");
    setSuccess("");

    setSelectedApply(() => index);
    const couponCode = promoCode[index];

    dispatch(
      getCouponID({
        couponCode,
        onSuccess: (ID) => {
          currency;
          checkPromoCode(ID, currency).then((isValid) => {
            if (isValid) {
              setSuccess("Promo Code applied..!");
              setCouponCodeID(ID);
            } else {
              setError("Promo Code not valid");
            }
          });
        },
        onError: (error) => {
          setError(error);
          // setSelectedApply(() => "");
        },
      })
    );
  };

  const HandleCreateCheckout = async (
    e,
    item,
    priceId,
    packageName,
    packagePrice,
    index
  ) => {
    e.preventDefault();
    // console.log("promoCode",promoCode)
    let  tax;
    if (item?.Currency === "GBP") {
      tax = 20;
    } else {
      tax = 0;
    }
    const currentPromoCode = promoCode[index] || "";
    console.log("currentPromoCode", currentPromoCode);

    try {
      const response = await CreateStripeCheckoutSession({
        userEmail,
        userId,
        priceId,
        authToken,
        userName,
        packageName,
        packagePrice,
        couponCodeID,
        tax,
      });
      // console.log("response__",response)

      // if(response.StripeCustomerId)
      // {
      //   setCookie("user", action.payload.detail);
      // }

      const stripe = await getStripe();
      if (userInfo) {
        const updatedUserString = JSON.stringify(userInfo);

        setCookie("user", updatedUserString, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.session.id,
      });
    } catch (error) {
      console.log("inside catch=", error);
    } finally {
      console.log("inside fainally");
    }
  };
  return (
    <>
      <section>
        <div className="lg:grid lg:grid-cols-12 p-2 md:px-8 py-4 gap-3">
          <div className="lg:col-span-4 items-start">
            <h1 className="lg:text-[33px] sm:text-sm font-semibold tracking-wide  ">
              Subscriptions
            </h1>
          </div>
          <div className="lg:col-span-2 ">
            <div className="flex justify-around px-2 py-1">
              <div
                className={` ${
                  currency === "GBP" ? "border-2 border-black rounded-md" : ""
                }`}
              >
                {" "}
                <Image
                  className={`cursor-pointer rounded-full `}
                  width={35}
                  height={30}
                  src={UK}
                  alt="UK  Flag"
                  onClick={UKChangeHanler}
                />
              </div>
              <div
                className={`${
                  currency === "USD" ? "border-2 border-black rounded-md" : ""
                }`}
                S
              >
                <Image
                  className={`cursor-pointer rounded-full`}
                  width={35}
                  height={30}
                  src={USA}
                  alt="USA Flag"
                  onClick={USAChangeHanler}
                />
              </div>
            </div>
          </div>
          <div className="lg:cols-span-6"></div>
        </div>
      </section>
      <main className="subscriptions grid  sm:grid-cols-1 p-1 md:p-8  md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-6 lg:h-100 ">
        {subscription.length > 0 ? (
          subscription.map((item, index) => (
            <>
              <Card key={index} className=" bg-gray-100">
                <div className="container m-auto">
                  <CardHeader className="p-2 mt-3">
                    <CardTitle className="text-2xl text-center font-medium tracking-normal ">
                      {item.Name}
                    </CardTitle>
                    <CardDescription className="px-2 pt-3">
                      {/* <p className="lg:text-[18px] sm:text-[12px] text-primary-dark font-medium">
                        {" "}
                        {item.NumberOfImages} image credits per p/m
                      </p> */}
                      <p className="lg:text-[16px] font-medium sm:text-[12px] text-center text-black mt-2">
                        Suitable for up to {item.NumberOfImages} car adverts p/m
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-y-8 p-1 md:p-3">
                    <div className=" ">
                      {Subscriptions.length > 0 &&
                        Subscriptions[0].features.map((feature, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-x-2 mb-4"
                          >
                            <IoCheckbox className="text-primary sm:text-sm md:text-lg lg:text-2xl" />
                            <small className="sm:text-sm md:text-lg lg:text-[16px] text-black">
                              {feature}
                            </small>
                          </span>
                        ))}
                    </div>
                  </CardContent>
                  <Separator className="my-2" />
                  <CardFooter className="flex flex-col gap-y-2 ">
                    <small className="sm:text-sm md:text-[15px]  font-semibold text-primary">
                      {currency === "USD" ? "$" : "£"}
                      {item.Price + `${currency === "USD" ? "+ Tax Rates/" : " + VAT/"}`} <span className=" text-[12px]">month</span>
                    </small>
                    <div className="relative">
                      <Input
                        className="mx-0 text-[10px] md:text-[12px] basis-3/4 border-b-primary bg-white"
                        placeholder="Promotional Code"
                        value={promoCode[index] || ""}
                        onChange={(e) => {
                          setPromoCode((previous) => ({
                            ...previous,
                            [index]: e.target.value,
                          }));
                        }}
                      />
                      <button
                        className="text-[10px] md:text-[12px] mx-3 text-primary-dark absolute"
                        disabled={!promoCode[index]}
                        style={{
                          top: "50%",
                          transform: "translateY(-50%)",
                          right: "0",
                        }}
                        onClick={() => handlePromo(index)}
                      >
                        {couponLoader && selectedApply == index
                          ? "verifying.."
                          : "Apply"}
                      </button>
                    </div>
                    {error && selectedApply == index && (
                      <FormError message={error} />
                    )}
                    {success && selectedApply == index && (
                      <FormSuccess message={success} />
                    )}

                    <Button
                      className="bg-primary text-white rounded-full mx-2 w-full"
                      onClick={(e) =>
                        HandleCreateCheckout(
                          e,
                          item,
                          item?.StripePriceId,
                          item?.Name,
                          item?.Price,
                          index
                        )
                      }
                    >
                      Purchase
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </>
          ))
        ) : subscriptionLoader ? (
          [...Array(3)].map((_, index) => (
            <Card key={index} className=" bg-gray-100">
              <div className="container m-auto">
                <CardHeader className="p-2 mt-3">
                  <CardTitle className="text-2xl text-center font-medium tracking-normal ">
                    <Skeleton className="h-4 w-22 bg-whitee" />
                  </CardTitle>
                  <CardDescription className="px-2 pt-3">
                    <Skeleton className="h-4 w-22 bg-whitee" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-8 p-1 md:p-3">
                  <Skeleton className="h-4 w-22 bg-whitee " />
                  <Skeleton className="h-4 w-22 bg-whitee" />
                  <Skeleton className="h-4 w-22 bg-whitee" />
                  <Skeleton className="h-4 w-22 bg-whitee" />
                  <Skeleton className="h-4 w-22 bg-whitee" />
                  <Skeleton className="h-4 w-22 bg-whitee " />
                  <Skeleton className="h-4 w-22 bg-whitee" />
                  <Skeleton className="h-4 w-22 bg-whitee" />
                </CardContent>
                <Separator className="my-2" />
              </div>
            </Card>
          ))
        ) : subscription.length === 0 && loader === false ? (
          <span>No Data Found</span>
        ) : (
          ""
        )}
      </main>
    </>
  );
};
export default Subscription;
