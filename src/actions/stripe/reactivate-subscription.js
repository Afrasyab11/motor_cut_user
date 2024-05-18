"use server";
import Stripe from "stripe";

// Initialize Stripe with your secret API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const reactivateSubscription = async (customerId, subscriptionId, priceId) => {
  try {
    // Retrieve the customer to check for a default payment method
    // const customer = await stripe.customers.retrieve(customerId);
    // console.log("customer98989898", customer);
    // if (!customer.invoice_settings.default_payment_method) {
    //   return {
    //     success: false,
    //     error: "Customer has no default payment method",
    //   };
    // }

    // Create a new subscription
    const newSubscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    // const paymentIntent = newSubscription.latest_invoice.payment_intent;
    // console.log("paymentIntent/////", paymentIntent);
    // if (
    //   paymentIntent.status === "requires_action" ||
    //   paymentIntent.status === "requires_payment_method"
    // ) {
    //   const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
    //     paymentIntent.id,
    //     {
    //       payment_method: customer.invoice_settings.default_payment_method,
    //     }
    //   );
    //   console.log("confirmedPaymentIntent----++++", confirmedPaymentIntent);
    //   if (confirmedPaymentIntent.status === "succeeded") {
    //     return { success: true, newSubscription };
    //   } else {
    //     return {
    //       success: false,
    //       error: "Payment confirmation failed",
    //       paymentIntentStatus: confirmedPaymentIntent.status,
    //     };
    //   }
    // }

    return { success: true, newSubscription };
  } catch (error) {
    console.log("Reactivation Error", error);
    return { success: false, error: error.message };
  }
};

export { reactivateSubscription };
