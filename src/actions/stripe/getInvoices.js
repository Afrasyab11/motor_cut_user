"use server";

import Stripe from "stripe";

const stripe = new Stripe(
  
  // process.env.STRIPE_SECRET_KEY
  "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"

  , {
  apiVersion: "2023-10-16",
});

export const getCustomerInvoices = async (customerId, lastInvoiceId) => {
  if (!customerId) {
    return [];
  }
  const params = {
    customer: customerId,
    status: "paid",
    // limit: 4,
  };


  if (lastInvoiceId) {
    params.starting_after = lastInvoiceId;
  }
  try {
    const response = await stripe.invoices.list(params);
    return response;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};
