import {z} from  "zod";
/* <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="text"
                    id="company-name"
                    name="company-name"
                    placeholder="Company Name"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="number"
                    id="mobile-no"
                    name="mobile-no"
                    placeholder="Mobile Number"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="text"
                    id="billing-email"
                    name="billing-email"
                    placeholder="Billing Email Address"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="text"
                    id="billing-line-1"
                    name="billing-line-1"
                    placeholder="Billing Line 1"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="text"
                    id="billing-line-2"
                    name="billing-line-2"
                    placeholder="Billing Line 2"
                    className="border-b border-b-primary bg-white"
                  />

                  <Input
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    placeholder="Postal Code"
                    className="border-b border-b-primary bg-white"
                  /> */
export const accountProfileSchema = z.object({
    name: z.string().nonempty(),
    companyName: z.string().nonempty(),
    mobileNo: z.string().nonempty(),
    email: z.string().email(),
    billingEmail: z.string().email(),
    country: z.string().nonempty(),
    billingLine1: z.string().nonempty(),
    billingLine2: z.string().nonempty(),
    postalCode: z.string().nonempty(),
    });

    
