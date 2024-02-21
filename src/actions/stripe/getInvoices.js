"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const getCustomerInvoices = async (customerId, lastInvoiceId) => {
  if (!customerId) {
    return [];
  }
  const params = {
    customer: customerId,
    status: "paid",
    limit: 4,
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
