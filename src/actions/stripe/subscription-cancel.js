"use server";
import Stripe from "stripe";

const stripe = new Stripe(
  // process.env.STRIPE_SECRET_KEY
  "sk_test_51OUlCAE66tYGrLUMiMosb7Ql8zts22WUzTGMNV9wFgpliFMHffn7uu54u3nYhq8ByMeJ3SCKNJStqydFoEpchRyl00pPA4TG1n"

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
