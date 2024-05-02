"use server";

import Stripe from "stripe";

const stripe = new Stripe(
  "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"
  // process.env.STRIPE_SECRET_KEY
  
  , {
  apiVersion: "2023-10-16",
});

export const CreateBillingSession = async (userId, stripeCustomerId) => {
  if (userId && stripeCustomerId) {
    try {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        // return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
        return_url: `https://motorcutuser.vercel.app/main/account`,

      });
      return stripeSession;
    } catch (error) {
      console.error("Error creating billing session:", error);
      throw error;
    }
  } else {
    throw new Error("Missing user ID or Stripe customer ID");
  }
};
