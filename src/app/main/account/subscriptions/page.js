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

import { CreateStripeCheckoutSession } from "@/actions/stripe/checkout-session";
import getStripe from "@/utils/get-stripe";
import { getSubscriptionAction } from "@/store/subscription/subscriptionThunk";
import { IoCheckbox } from "react-icons/io5";
// import "./subscriptions.module.css";
const Subscriptions = [
  {
    features: [
      "Online WhatsApp",
      "Mobile App Access",
      "Logo Branding",
      "Custom Formats",
      "1GB Storage",
    ],
  },
];
const Subscription = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const { subscription, subscriptionLoader } = useSelector(
    (state) => state?.subscription
  );

  const [currency, setCurrency] = useState("GBP");
  let userString = getCookie("user");
  let userInfo = userString ? JSON.parse(userString) : null;
  const [promoCode, setPromoCode] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const userEmail = userInfo?.UserEmail;
  const userId = userInfo?.UserId;
  const authToken = userInfo?.AccessToken;
  useEffect(() => {
    dispatch(getSubscriptionAction(currency));
  }, [currency]);

  const UKChangeHanler = (e) => {
    e.preventDefault();
    setCurrency("GBP");
    dispatch(getSubscriptionAction("GBP"));
    setPromoCode({});
    setErrorMessages({});
  };
  const USAChangeHanler = (e) => {
    e.preventDefault();
    setCurrency("USD");
    dispatch(getSubscriptionAction("USD"));
    setPromoCode({});
    setErrorMessages({});
  };

  const HandleCreateCheckout = async (e, priceId, index) => {
    e.preventDefault();
    console.log("Price",)
    // const currentPromoCode = promoCode[index] || "";
    // if (!currentPromoCode.trim()) {
    //   setErrorMessages({
    //     ...errorMessages,
    //     [index]: "Promotional code is required.",
    //   });
    //   return;
    // }
    // setErrorMessages({ ...errorMessages, [index]: "" });

    console.log(
      "Proceeding with promo code: and PriceID",
      priceId,
    );

    try {
      const response = await CreateStripeCheckoutSession({
        userEmail,
        userId,
        priceId,
        authToken,
      });
      const stripe = await getStripe();
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
        <div className="lg:grid lg:grid-cols-12 px-8 py-4 ">
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
      <main className="subscriptions grid  sm:grid-cols-1 p-8  md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-6 lg:h-100 ">
        {subscription && subscription.length > 0 ? (
          subscription.map((item, index) => (
            <>
              <Card key={index} className=" bg-gray-100">
                <div className="container m-auto">
                  <CardHeader className="p-2 mt-3">
                    <CardTitle className="text-2xl text-center font-medium tracking-normal ">
                      {item.Name}
                    </CardTitle>
                    <CardDescription className="px-2 pt-3">
                      <p className="lg:text-[18px] sm:text-[12px] text-primary-dark font-medium">
                        {" "}
                        {item.NumberOfImages} image credits per p/m
                      </p>
                      <p className="lg:text-[16px] sm:text-[12px] text-black mt-2">
                        Suitable for approx {item.cars} p/m
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
                      {item.Price + " PER MONTH " + "(+ VAT)"}
                    </small>
                    <div className="relative">
                      <Input
                        className="mx-0 basis-3/4 border-b-primary bg-white"
                        placeholder="Promotional Code"
                        value={promoCode[index] || ""}
                        onChange={(e) => {
                          setPromoCode((previous) => ({
                            ...previous,
                            [index]: e.target.value,
                          })),
                            setErrorMessages((prev) => ({
                              ...prev,
                              [index]: "",
                            }));
                        }}
                      />
                      <button
                        className="text-sm mx-3 text-primary-dark absolute"
                        style={{
                          top: "50%",
                          transform: "translateY(-50%)",
                          right: "0",
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    {/* {errorMessages[index] && (
                      <p className="text-red-500 text-sm ">
                        {errorMessages[index]}
                      </p>
                    )} */}
                    <Button
                      className="bg-primary text-white rounded-full mx-2 w-full"
                      onClick={(e) =>
                        HandleCreateCheckout(e, item?.StripePriceId, index)
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
          <div className="flex justify-center">
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span>No Data Found</span>
          </div>
        )}
      </main>
    </>
  );
};
export default Subscription;
