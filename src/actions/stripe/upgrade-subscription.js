"use server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OUlCAE66tYGrLUMiMosb7Ql8zts22WUzTGMNV9wFgpliFMHffn7uu54u3nYhq8ByMeJ3SCKNJStqydFoEpchRyl00pPA4TG1n",
  {
    apiVersion: "2023-10-16",
  }
);

const UpgradeSubscription = async (subscriptionId, newPriceId) => {
  try {
    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("Subscription Items ID:", subscription.items.data[0].id);

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
