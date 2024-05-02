"use server";
import Stripe from "stripe";

const stripe = new Stripe(
  // process.env.STRIPE_SECRET_KEY
  "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"

  , {
  apiVersion: "2023-10-16",
});

export const CancelSubscription = async (userId, stripeSubscriptionId) => {
  if (!userId) {
    throw new Error("User not found.");
  }

  try {
    const subscription = await stripe.subscriptions.cancel(
      stripeSubscriptionId
    );
    return { success: true, message: "Subscription cancelled successfully." };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { success: false, message: error.message };
  }
};
