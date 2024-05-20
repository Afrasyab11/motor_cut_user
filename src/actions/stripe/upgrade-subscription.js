"use server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: "2023-10-16",
  }
);

const UpgradeSubscription = async (subscriptionId, newPriceId) => {
  try {
    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    // Update the subscription with the new plan
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id, // Assuming only one subscription item
          price: newPriceId,
        },
      ],
    });
    return { success: true, message: "Subscription updated successfully", updatedSubscription };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { success: false, error: error.message };  // Ensure you return a value here
  }
};

export { UpgradeSubscription };
