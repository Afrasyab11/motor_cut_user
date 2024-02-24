"use server";

import Stripe from "stripe";

const stripe = new Stripe(
  
  // process.env.STRIPE_SECRET_KEY
  "sk_test_51OUlCAE66tYGrLUMiMosb7Ql8zts22WUzTGMNV9wFgpliFMHffn7uu54u3nYhq8ByMeJ3SCKNJStqydFoEpchRyl00pPA4TG1n"

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
