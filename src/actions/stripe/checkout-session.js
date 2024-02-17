"use server";
import { axiosInstance, baseDomain } from "@/utils/axios";
import Stripe from "stripe";

const updateStripeCustomerId = async (
  userEmail,
  stripeCustomerId,
  authToken
) => {
  const url = `${baseDomain}Subscriptions/Update-Stripe-Customer-Id/`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", authToken);

  const body = JSON.stringify({
    Email: userEmail,
    CustomerId: stripeCustomerId,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(
        "Failed to update Stripe customer ID:",
        JSON.stringify(errorResponse, null, 2)
      );
      throw new Error("Failed to update Stripe customer ID");
    }

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.detail || "Failed to update Stripe customer ID");
    }

    console.log("Customer ID updated successfully:", data);
    return data; 
  } catch (error) {
    console.error("Error in updating Stripe customer ID:", error);
    throw error; 
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

async function CreateStripeCheckoutSession(data) {
  const { userEmail, userId, priceId, authToken } = data;

  try {
    let existingUser;

    if (userId) {
      // existingUser = await getUserById(userId);
    }

    const stripeCustomer = await stripe.customers.create({
      email: userEmail, 
    });

    try {
      await updateStripeCustomerId(userEmail, stripeCustomer.id, authToken);
    } catch (error) {
      console.error("Failed to update customer ID:", error);
      throw new Error("Failed to update customer ID, cannot proceed.");
    }

    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: stripeCustomer.id,
        // customer: existingUser.stripeCustomerId,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/main/dashboard`,
        cancel_url: process.env.NEXT_PUBLIC_APP_URL,
        // subscription_data: {
        //   metadata: {
        //     UserId: existingUser.id,
        //     toolUrl: toolUrl,
        //     planType: planType,
        //   },
        // },
      });

      if (!checkoutSession.url) {
        throw new Error("Could not create checkout session");
      }

      return {
        session: {
          id: checkoutSession.id,
          url: checkoutSession.url,
        },
      };
    } catch (error) {
      console.error("Failed to create Stripe checkout session:", error);

      return {
        error: {
          message:
            "Failed to initiate payment process. Please try again later.",
          details: error.message,
        },
      };
    }
  } catch (error) {
    console.error("Failed to authenticate session:", error);

    return {
      error: {
        message: "Failed to authenticate session. Please try again later.",
        details: error.message,
      },
    };
  }
}

export { CreateStripeCheckoutSession };
