// utils/stripe.js
"use server";
import Stripe from "stripe";

// Initialize Stripe with your secret API key
const stripe = new Stripe(
    "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"
    // process.env.STRIPE_SECRET_KEY
    , {
    apiVersion: "2023-10-16",
  });
  
export async function reactivateSubscription(subscriptionId) {
  try {
    // Retrieve the canceled subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update subscription status to 'active'
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false, // Reactivate the subscription immediately
    });

    // Optionally handle payment details if necessary
    return { success: true, message: 'Subscription reactivated successfully.' };
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    return { success: false, error: 'Failed to reactivate subscription.' };
  }
}
