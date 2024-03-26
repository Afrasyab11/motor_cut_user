"use client";
import React, { useEffect } from "react";
import "../../globals.css";
import "./account.css";
import UpdateProfile from "@/components/account/UpdateProfile";
import Billing from "@/components/account/Billing";
import Subscriptions from "@/components/account/Subscription";
const Account = () => {
  return (
    <>
      {
        <section className="grid sm:grid-cols-12 md:grid-cols-12  gap-3">
          <div className="profile bg-gray-100 rounded-3xl sm:col-span-12 md:col-span-6 p-2 ">
            <UpdateProfile />
          </div>
          <div className="sm:col-span-12 md:col-span-6 flex flex-col gap-3 justify-between">
            <div className="billing bg-gray-100 rounded-3xl  row-span-1">
              <Billing />
            </div>
            <div className="subscription bg-gray-100 rounded-3xl row-span-1">
              <Subscriptions />
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Account;
