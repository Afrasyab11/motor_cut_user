"use client";
// import * as z from "zod";
import { FillProfilePageSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FillProfilePageAction } from "@/actions/fillProfilePage";
import "react-international-phone/style.css";
import { CountryDropdown } from "react-country-region-selector";
import { FormSuccess } from "../form-success";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation'
import { registerUser } from "@/store/user/userThunk";

export const FillProfilePageForm = ({formData,setFormData, nextStep, prevStep }) => {

  const { isLoading } = useSelector((state) => state?.user);

  const dispatch=useDispatch()
  const router = useRouter()

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(FillProfilePageSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      address: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = (values) => {
    
    setError("");
    setSuccess(""); 
let payload={...formData,...values}



    dispatch(registerUser(
      { payload,
        onSuccess:()=>{
          router.push('/auth/login')
          // setSuccess(data ? data.success : "");
        },
        onError:(msg)=>{  
          setError(msg);
        }
      }))
   
    // startTransition(() => {
    //   FillProfilePageAction(values).then((data) => {
    //     setFormData(prev => ({ ...prev, ...values }))
    //     setError(data ? data.error : "");
    //     setSuccess(data ? data.success : "");
    //     if (data.success) {
    //       // nextStep();

    //     }
    //   });
    // });
  };

  const inputStyles = {
    border: "none",
    borderBottom: "1px solid #814adf",
    width: "100%",
  };
  const [country, setCountry] = useState("");
  return (
    <CardWrapper
      className="p-3"
      headerText="Fill in your Profile"
      backButtonLabel="Don't Have an account?"
      backButtonHref="/auth/register"
      btnText="Sign Up with Google"
      showProgressBar
      progressBarCount="5"
    >
 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-8"
                      {...field}
                      placeholder="Enter your full name"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-8"
                      {...field}
                      placeholder="Enter your company name"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Address</FormLabel>
                  <FormControl>
                    <Input
                      className="h-8"
                      {...field}
                      placeholder="Enter your address"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Postal/Zip code</FormLabel>
                  <FormControl>
                    <Input
                      className="h-8"
                      {...field}
                      placeholder="Enter your Postal/Zip code"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Country</FormLabel>
                  <FormControl>
                    <CountryDropdown
                    {...field}
                      value={country}
                      onChange={(val) => {
                        setCountry(val);
                        form.setValue("country", val);
                      }}
                      classes="countrySelect"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex items-center justify-center gap-7 pt-7">
            <Button
              variant="outline"
              type="submit"
              className="rounded-full w-40"
              disabled={isPending}
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="rounded-full w-40 text-white"
              disabled={isPending}
            >
              {isLoading ?"Creating....":"Create"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
