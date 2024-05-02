import {  loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
            // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

        stripePromise = loadStripe(
            "pk_live_51OifZ0CHv44ZbdyVJ8daB7T0mWVx6zqTpSZojyx2GG2ZBBuJHF5imD8qmuGEjruDEzvKqAOqMPtIIDSPMGdT0KPY00fu9UcRWA"
            // "pk_test_51OUlCAE66tYGrLUMDWjRkd0wfZOSrjcZWGRbvRFzQ2Dk4JK478haIldZxltBMsYoIhuALDTYzMbO9rekvZXAok1F00Y4EeXCzB"
            );
    }
    return stripePromise;
};

export default getStripe;