"use server";
import { baseDomain } from "@/utils/axios";
import Stripe from "stripe";

const getUserById = async (userId) => {
  const url = `${baseDomain}User/Get-User-By-Id/?UserId=${userId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.detail[0];
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

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

    return data;
  } catch (error) {
    console.error("Error in updating Stripe customer ID:", error);
    throw error;
  }
};

const stripe = new Stripe(
  "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"
  // process.env.STRIPE_SECRET_KEY
);

async function CreateStripeCheckoutSession(data) {
  const {
    userEmail,
    userId,
    priceId,
    authToken,
    userName,
    packageName,
    packagePrice,
    couponCodeID,
    tax,
  } = data;

  console.log("data in Checkout", data);
  try {
    let stripeCustomerId = await ensureStripeCustomer({
      userId,
      userEmail,
      authToken,
    });

  
    const taxRate = await stripe.taxRates.create({
      display_name: "Tax",
      percentage: tax,
      inclusive: false,
    });

    const payload = buildCheckoutSessionPayload({
      stripeCustomerId,
      priceId,
      couponCodeID,
      userId,
      userName,
      packageName,
      packagePrice,
      taxRates: [taxRate.id],
    });
 
    const checkoutSession = await stripe.checkout.sessions.create(payload);
    console.log("checkoutSession", checkoutSession);

    if (!checkoutSession.url) {
      throw new Error("Could not create checkout session");
    }

    return {
      StripeCustomerId: stripeCustomerId,
      session: {
        id: checkoutSession.id,
        url: checkoutSession.url,
      },
    };
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    throw new Error(
      "Failed to initiate payment process. Please try again later."
    );
  }
}

async function ensureStripeCustomer({ userId, userEmail, authToken }) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const existingUser = await getUserById(userId);
  if (existingUser && existingUser.stripeCustomerId) {
    return existingUser.stripeCustomerId;
  } else {
    const stripeCustomer = await stripe.customers.create({ email: userEmail });
    await updateStripeCustomerId(userEmail, stripeCustomer.id, authToken);
    return stripeCustomer.id;
  }
}
const today = new Date();
const formattedDate = today.toISOString().split("T")[0];
function buildCheckoutSessionPayload({
  stripeCustomerId,
  priceId,
  couponCodeID,
  userId,
  userName,
  packageName,
  packagePrice,
  taxRates,
}) {
  let payload = {
    mode: "subscription",
    customer: stripeCustomerId,
    success_url: `${"https://motorcutuser.vercel.app"}/main/account`,
    cancel_url: `${"https://motorcutuser.vercel.app"}/main/account`,
    line_items: [{ price: priceId, quantity: 1, tax_rates: taxRates }],
    subscription_data: {
      metadata: {
        UserId: userId,
        UserName: userName,
        PackageName: packageName,
        PackagePrice: packagePrice,
        Date: formattedDate,
      },
    },
  };

  if (couponCodeID) {
    payload.discounts = [{ coupon: couponCodeID }];
  }

  return payload;
}

async function checkPromoCode(couponCode, selectedCurrency) {
  try {
    const { valid, currency } = await stripe.coupons.retrieve(couponCode);
    let currencyMatch =
      currency.toLowerCase() == selectedCurrency.toLowerCase();
    if (valid && currencyMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking promo code:", error);
    return { error: true, message: error.message };
  }
}

export { CreateStripeCheckoutSession, checkPromoCode };
