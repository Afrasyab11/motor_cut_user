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
// import "../../globals.css";
import "./account.css";
import { updateUserProfile, getUserProfileData } from "@/store/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { getCookie } from "cookies-next";
import { dashboardStatsAction } from "@/store/dashboard/dashboardThunk";
import { CancelSubscription } from "@/actions/stripe/subscription-cancel";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-international-phone/style.css";
import CancelSubscriptionModal from "../modals/CancelSubscriptionModal";

const Subscription = () => {
  const dispatch = useDispatch();
  const { getProfile } = useSelector((state) => state?.user);
  const { states } = useSelector((state) => state.dashboard);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [stats, setStats] = useState("");
  const [loader,setLoader]=useState(false)

  console.log("stats: ", stats);
  const [loadingStates, setLoadingStates] = useState({
    invoices: true,
  });

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  let user = JSON.parse(getCookie("user") || "{}");
  useEffect(() => {
    const fetchData = async () => {
      if (user.UserId) {
        dispatch(getUserProfileData(user.UserId));
        dispatch(dashboardStatsAction(user.UserId));
      }
      setLoadingStates((prev) => ({ ...prev, profile: false, stats: false }));
    };
    fetchData();
  }, [user.UserId]);

  const fetchInvoices = async () => {
    // if (user?.StripeCustomerId) {
    //   try {
    //     const customerInvoices = await getCustomerInvoices(
    //       user?.StripeCustomerId,
    //       lastInvoiceId
    //     );
    //     setInvoices(customerInvoices.data);

    //     if (customerInvoices.data.length > 0) {
    //       const lastId =
    //         customerInvoices.data[customerInvoices.data.length - 1].id;
    //       setLastInvoiceId(lastId);
    //     }
    //     setHasMore(customerInvoices.has_more);
    //   } catch (error) {
    //     console.error("Error fetching invoices:", error);
    //     toast.error("Failed to fetch invoices");
    //   }
    // }
    setLoadingStates((prev) => ({ ...prev, invoices: false }));
  };
  useEffect(() => {
    fetchInvoices();
  }, [user?.StripeCustomerId]);

  useEffect(() => {
    if (getProfile[0]) {
      if (getProfile[0]?.stripeCustomerId) {
      }
    }
  }, [user?.UserId, getProfile]);

  useEffect(() => {
    dispatch(getUserProfileData(user?.UserId));
  }, [user?.UserId]);

  useEffect(() => {
    dispatch(dashboardStatsAction(user?.UserId));
  }, [user?.UserId]);

  const route = useRouter();

  const inputStyles = {
    border: "none",
    borderBottom: "1px solid #814adf",
    width: "100%",
  };

  useEffect(() => {
    setStats(states);
  }, [states]);

  const handleCancelSubscription = () => {
    setDialogOpen(true);
  };

    const confirmCancelSubscription = async () => {
        setLoader(true)
      if (!getProfile[0]?.stripeSubscriptionId) return;

      const res = await CancelSubscription(
        user.UserId,
        getProfile[0].stripeSubscriptionId
      );
      console.log("res", res);
      if (res.success) {
        toast.success("Subscription cancelled successfully1");
        dispatch(dashboardStatsAction(user.UserId));
        setDialogOpen(false)
        setLoader(false)

        dispatch(getUserProfileData(user.UserId)); // Refresh user data
      } else {
        setLoader(false)
        toast.error(res.message || "Failed to cancel subscription");
      }
    };

  return (
    <>
      <Card className="shadow-none">
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
                {stats?.PackageName || 0}
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
                {stats?.RenewalDate || 0}
              </h4>
              <p className="text-sm">Renewal Date</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col ">
          {loadingStates.invoices ? (
            <ImSpinner8 className="spinning-icon" />
          ) : stats?.PackageName != "Free Tier" &&
            stats?.RenewalDate != "Cancelled" &&
            stats?.PackageName ? (
            <Button
              variant="outline"
              className="rounded-full outline outline-1 outline-black text-red-700 my-2 text-sm h-full w-1/2"
              onClick={handleCancelSubscription}
              //   onClick={() =>
              //     handleCancelSubscription(
              //       user?.UserId,
              //       getProfile[0]?.stripeSubscriptionId
              //     )
              //   }
            >
              Cancel Subscriptions
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full outline outline-1 outline-black text-primary-light  hover:text-primary-light my-2 text-sm h-full w-1/2"
              onClick={(e) => {
                e.preventDefault();
                route.push("/main/account/subscriptions");
              }}
            >
              See Subscriptions
            </Button>
          )}
        </CardFooter>
      </Card>
      {isDialogOpen && (
        <CancelSubscriptionModal
          open={isDialogOpen}
          setOpen={handleCloseDialog}
          subscriptionHandler={confirmCancelSubscription}
          loader={loader}
        />
      )}
    </>
  );
};

export default Subscription;
