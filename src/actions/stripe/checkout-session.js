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
  "sk_test_51OUlCAE66tYGrLUMiMosb7Ql8zts22WUzTGMNV9wFgpliFMHffn7uu54u3nYhq8ByMeJ3SCKNJStqydFoEpchRyl00pPA4TG1n",
  // process.env.STRIPE_SECRET_KEY

  {
    apiVersion: "2023-10-16",
  }
);

// async function CreateStripeCheckoutSession(data) {
//   const {
//     userEmail,
//     userId,
//     priceId,
//     authToken,
//     userName,
//     packageName,
//     packagePrice,
//     couponCodeID
//   } = data;
//   console.log('data: ', data);

//   try {
//     let existingUser;
//     let stripeCustomerId;

//     if (userId) {
//       existingUser = await getUserById(userId);
//     }

//     if (existingUser.stripeCustomerId) {
//       stripeCustomerId = existingUser.stripeCustomerId;
//       // console.log("existing user Id=", existingUser.stripeCustomerId);
//     } else {
//       const stripeCustomer = await stripe.customers.create({
//         email: userEmail,
//       });

//       try {
//         await updateStripeCustomerId(userEmail, stripeCustomer.id, authToken);
//       } catch (error) {
//         console.error("Failed to update customer ID:", error);
//         throw new Error("Failed to update customer ID, cannot proceed.");
//       }

//       stripeCustomerId = stripeCustomer.id;
//     }

//     try {

//     let payload={}
//       if(couponCodeID){

//         payload= {
//           mode: "subscription",
//           customer: stripeCustomerId,
//           discounts:[{
//                       coupon:couponCodeID
//                     }],
//           line_items: [
//             {
//               price: priceId,
//               quantity: 1,
              
//             },
//           ],
//           // success_url: `${process.env.NEXT_PUBLIC_APP_URL}/main/dashboard`,
//           success_url: `http://localhost:3000/main/account`,
//           cancel_url: "http://localhost:3000/main/account",
  
//           // cancel_url: process.env.NEXT_PUBLIC_APP_URL,
//           subscription_data: {
//             metadata: {
//               UserId: userId,
//               UserName: userName,
//               PackageName: packageName,
//               PackagePrice: packagePrice,
//               // toolUrl: toolUrl,
//               // planType: planType,
//             },
//           },
//         }
//       }else{

//         payload= {
//           mode: "subscription",
//           customer: stripeCustomerId,
         
//           line_items: [
//             {
//               price: priceId,
//               quantity: 1,
              
//             },
//           ],
//           // success_url: `${process.env.NEXT_PUBLIC_APP_URL}/main/dashboard`,
//           success_url: `http://localhost:3000/main/account`,
//           cancel_url: "http://localhost:3000/main/account",
  
//           // cancel_url: process.env.NEXT_PUBLIC_APP_URL,
//           subscription_data: {
//             metadata: {
//               UserId: userId,
//               UserName: userName,
//               PackageName: packageName,
//               PackagePrice: packagePrice,
//               // toolUrl: toolUrl,
//               // planType: planType,
//             },
//           },
//         }
//       }


//       const checkoutSession = await stripe.checkout.sessions.create(payload);

//       if (!checkoutSession.url) {
//         throw new Error("Could not create checkout session");
//       }

//       return {
//         StripeCustomerId: stripeCustomerId,
//         session: {
//           id: checkoutSession.id,
//           url: checkoutSession.url,
//         },
//       };
//     } catch (error) {
//       console.error("Failed to create Stripe checkout session:", error);

//       return {
//         error: {
//           message:
//             "Failed to initiate payment process. Please try again later.",
//           details: error.message,
//         },
//       };
//     }
//   } catch (error) {
//     console.error("Failed to authenticate session:", error);

//     return {
//       error: {
//         message: "Failed to authenticate session. Please try again later.",
//         details: error.message,
//       },
//     };
//   }
// }


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
  } = data;

  try {
    let stripeCustomerId = await ensureStripeCustomer({ userId, userEmail, authToken });

    const payload = buildCheckoutSessionPayload({
      stripeCustomerId,
      priceId,
      couponCodeID,
      userId,
      userName,
      packageName,
      packagePrice
    });

    const checkoutSession = await stripe.checkout.sessions.create(payload);

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
    throw new Error("Failed to initiate payment process. Please try again later.");
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

function buildCheckoutSessionPayload({ stripeCustomerId, priceId, couponCodeID, userId, userName, packageName, packagePrice }) {
  let payload = {
    mode: "subscription",
    customer: stripeCustomerId,
    success_url: `${"https://motorcutuser.vercel.app"}/main/account`,
    cancel_url: `${"https://motorcutuser.vercel.app"}/main/account`,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      metadata: {
        UserId: userId,
        UserName: userName,
        PackageName: packageName,
        PackagePrice: packagePrice,
      },
    },
  };

  if (couponCodeID) {
    payload.discounts = [{ coupon: couponCodeID }];
  }

  return payload;
}

async function checkPromoCode(couponCode,selectedCurrency) {
  try {
    const {valid,currency} = await stripe.coupons.retrieve(couponCode);
     let currencyMatch=currency.toLowerCase()==selectedCurrency.toLowerCase()
    if (valid && currencyMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking promo code:", error);
    return  { error: true, message: error.message };
  }
}

export { CreateStripeCheckoutSession ,checkPromoCode };
