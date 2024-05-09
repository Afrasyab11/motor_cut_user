"use server";
import Stripe from "stripe";

const stripe = new Stripe(
  "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",
  // process.env.STRIPE_SECRET_KEY
  {
    apiVersion: "2023-10-16",
  }
);

const upgradeSubscription = async (customerId, newPriceId) => {
  try {
    // Retrieve the subscription associated with the customer
    const subscription = await stripe.subscriptions.retrieve(customerId);

    // Update the subscription with the new plan
    await stripe.subscriptions.update(subscription.id, {
      items: [
        {
          id: subscription.items.data[0].id, // Assuming only one subscription item
          price: newPriceId,
        },
      ],
    });

    return { success: true, message: "Subscription updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error updating subscription");
  }
};

export { upgradeSubscription };
