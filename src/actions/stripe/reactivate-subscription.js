"use server";
import Stripe from "stripe";

// Initialize Stripe with your secret API key
const stripe = new Stripe(
  "sk_test_51OUlCAE66tYGrLUMiMosb7Ql8zts22WUzTGMNV9wFgpliFMHffn7uu54u3nYhq8ByMeJ3SCKNJStqydFoEpchRyl00pPA4TG1n",
  {
    apiVersion: "2023-10-16",
  }
);

const reactivateSubscription = async ( subscriptionId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // const newSubscription = await stripe.subscriptions.create({
    //   customer: customerId,
    //   items: [{ price: priceId }],
    //   // payment_behavior: 'default_incomplete',
    //   // expand: ["latest_invoice.payment_intent"],
    // });

    // return { success: true, newSubscription };
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
    });
    return { success: true, message: "Subscription Reactivation successfully", updatedSubscription };
  } catch (error) {
    console.log("Reactivation Error", error);
    return { success: false, error: error.message };
  }
};

export { reactivateSubscription };

// const reactivateSubscription = async (customerId, priceId) => {
//   try {
   
//     const newSubscription = await stripe.subscriptions.create({
//       customer: customerId,
//       items: [{ price: priceId }],
//     });

//     return { success: true, newSubscription };
//   } catch (error) {
//     console.log("Reactivation Error", error);
//     return { success: false, error: error.message };
//   }
// };
// export { reactivateSubscription };

