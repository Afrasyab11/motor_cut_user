import {  loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
            // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

        stripePromise = loadStripe(
            "pk_test_51PXiOYRvVHt0jCSVOBkFMcklRiN3rIVj6muOyHlACxeZ2EHkvZMiCTv7sAfdheQIZmRgniF3tEUNbeN8w1Ka0knU00F3Z6W73U"
            );
    }
    return stripePromise;
};

// let stripePromise;
// const getStripe = () => {
//     if (!stripePromise) {
//         const publishableKey = `${process.env.STRIPE_PUBLIC_KEY}`
//         stripePromise = loadStripe(publishableKey);
//     }
//     return stripePromise;
// };

export default getStripe;
