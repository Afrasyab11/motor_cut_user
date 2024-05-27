"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const CancelSubscription = async (userId, stripeSubscriptionId) => {
  if (!userId) {
    throw new Error("User not found.");
  }

  try {
    // const subscription = await stripe.subscriptions.cancel(
    //   stripeSubscriptionId,
    // );
    const subscription = await stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        cancel_at_period_end: true,
      }
    );
    return { success: true, message: "Subscription cancelled successfully." };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { success: false, message: error.message };
  }
};
