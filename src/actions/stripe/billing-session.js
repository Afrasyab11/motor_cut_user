"use server";

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OUlCAE66tYGrLUMiMosb7Ql8zts22WUzTGMNV9wFgpliFMHffn7uu54u3nYhq8ByMeJ3SCKNJStqydFoEpchRyl00pPA4TG1n"
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
        return_url: `https://motor-cut-admin.vercel.app/billing`,

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
