// "use client";
// // import * as z from "zod";
// import { ForgotPasswordSchema, VerifyPasswordSchema} from '@/schemas';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "../../ui/form";
// import { Input } from "../../ui/input";
// import { Button } from "../../ui/button";
// import { CardWrapper } from "../card-wrapper";
// import { BackButton } from "../back-button";
// import { forgotUserPassword, userNewPassword, verifyUserPassword } from '@/store/user/userThunk';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { useState, useTransition } from 'react';
// import { FormError } from '../form-error';
// import { FormSuccess } from '../form-success';
// import { forgotPassword } from '@/actions/forgotPassword';
// import { resetPassword } from '@/actions/resetPassword';
// import { createNewPassword } from '@/actions/createNewPassword';
// import { ImSpinner8 } from 'react-icons/im';

// export const ForgotPassword = () => {

//   const { isLoading } = useSelector((state) => state?.user);

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [status,setStatus]=useState("email");
//   const [isPending, startTransition] = useTransition();

//   let loader =isLoading||isPending
//   const form = useForm({
//     resolver: zodResolver(ForgotPasswordSchema),
//     resolver: zodResolver(VerifyPasswordSchema),
//     // resolver: zodResolver(NewPasswordSchema),
//     defaultValues: {
//       email: "",
//       otp: "",
//       password:"",
//     },
//   });

//   const onSubmit = (values) => {

//     // First API call for email.
//     if (status==="email") {
//       setError("");
//       setSuccess("");
      
//       startTransition(() => {
//         forgotPassword(values).then((data) => {
         
//           let payload = {
//             Email: values.email,
//           }
//           dispatch(forgotUserPassword(
//             {
//               payload,
//               onSuccess: (e) => {
//                 setSuccess(e);
//                 // setSuccess("OTP sent Successfully. Please Check Your Email")
//                 setStatus("otp")
//               },
              

//               onError: (msg) => {
//                 setError(msg);
//               }
              
//             }))
//         });
//       });
//     }
//     // Second API call in which OTP is entered
//     else if(status==="otp") {
//       setError("");
//       setSuccess("");
//       startTransition(() => {
//         resetPassword(values).then((data) => {
//           let payload = {
//             Email: values.email,
//             OTP: values.otp,
//           }
//           dispatch(verifyUserPassword(
//             {
//               payload,
//               onSuccess: (e) => {
//                 setSuccess(e);
//                 setStatus("password")
//               },

//               onError: (msg) => {
//                 setError(msg);
//               }
//             }))

//         });
//       });
//     }
//     // Third API call in which New Password is entered and user redirect to the login page.
//     else if(status==="password"){

//       setError("");
//       setSuccess("");
//       startTransition(() => {
//         createNewPassword(values).then((data) => {
//           let payload = {
//             Email: values.email,
//             NewPassword: values.password,
//           }

//           dispatch(userNewPassword(
//             {
//               payload,
//               onSuccess: () => {
//                 setStatus("password")
//                 router.push('/auth/login')
//               },

//               onError: (msg) => {
//                 setError(msg);
//               }
//             }))
//         });
//       });
//     }
//   };


//   return (
//     <CardWrapper
//       headerText="Forgot-Password"
//       headerPadding="pb-2 mt-4"
//       backButtonLabel="Don't Have an account?"
//       // backButtonHref="/auth/register"
//       headerLogo
//       className="mt-16"
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-mutedFields">
//                     Enter Your Email
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="john.doe@example.com"
//                       type="email"
//                       disabled={isPending}
//                       required
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             {status== "otp" && (
//               <FormField
//                 control={form.control}
//                 name="otp"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-mutedFields">
//                       Enter the OTP
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="otp"
//                         type="text"
//                         disabled={isPending}
//                         required
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             )}
//             {status=="password" && (
//               <>
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-mutedFields">
//                         Enter Your New Password
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="New Password"
//                           type="password"
//                           disabled={isPending}
//                           required
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </>
//             )}
//           </div>
  
//           <FormError message={error} />
//           <FormSuccess message={success} />
    
//           <Button
//             type="submit"
//             className="w-full text-whitee rounded-full "
//             disabled={loader}
//           >
//             {loader ? "Submiting...":"Submit"}
//           </Button>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
  
// };



"use client"
import { useState } from "react";
import { CardWrapper } from "../card-wrapper";
import EmailSection from "../forgotten-password/EmailSection";
import VerifyOTP from "../forgotten-password/VerifyOTP";
import CreateNewPassword from "../forgotten-password/CreateNewPassword";
export const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email,setEmail]=useState("")
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const renderStep = () => {
    switch (step) {
      case 0:
        return <EmailSection setEmail={setEmail} nextStep={nextStep} />;
      case 1:
        return <VerifyOTP email={email} nextStep={nextStep} />;
      case 2:
        return <CreateNewPassword  email={email}  />;
     default:
        return null;
    }
  };
  return (
          <>  {renderStep()}
</>
  );
}






