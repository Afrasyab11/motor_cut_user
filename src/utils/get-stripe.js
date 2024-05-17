import {  loadStripe } from '@stripe/stripe-js';

// let stripePromise;
// const getStripe = () => {
//     if (!stripePromise) {
//             // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

//         stripePromise = loadStripe(
//             "pk_test_51OUlCAE66tYGrLUMDWjRkd0wfZOSrjcZWGRbvRFzQ2Dk4JK478haIldZxltBMsYoIhuALDTYzMbO9rekvZXAok1F00Y4EeXCzB"
//             );
//     }
//     return stripePromise;
// };

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        // const publishableKey = process.env.STRIPE_PUBLIC_KEY;
        // const publishableKey = `${process.env.PUBLISHABLE_KEY}`
        stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);
    }
    return stripePromise;
};

export default getStripe;
