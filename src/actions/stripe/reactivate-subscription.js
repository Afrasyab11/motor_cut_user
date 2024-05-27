"use server";
import Stripe from "stripe";

// Initialize Stripe with your secret API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const reactivateSubscription = async (customerId, subscriptionId, priceId) => {
  try {
    // const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: false,
      }
    );
    // Create a new subscription
    // const newSubscription = await stripe.subscriptions.create({
    //   customer: customerId,
    //   items: [{ price: priceId }],
    //   expand: ["latest_invoice.payment_intent"],
    // });
    return { success: true, subscription };
  } catch (error) {
    console.log("Reactivation Error", error);
    return { success: false, error: error.message };
  }
};

export { reactivateSubscription };
