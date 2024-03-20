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
        <section className="grid md:grid-cols-2 md:grid-rows-2 gap-3">
          <article className="profile bg-gray-100 rounded-3xl row-span-2 p-2 ">
            <UpdateProfile />
          </article>
          <article className="billing bg-gray-100 rounded-3xl  row-span-1">
            <Billing />
          </article>
          <article className="subscription bg-gray-100 rounded-3xl row-span-1">
            <Subscriptions />
          </article>
        </section>
      }
    </>
  );
};

export default Account;
