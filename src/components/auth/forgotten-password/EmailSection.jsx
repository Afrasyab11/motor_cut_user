import React from 'react'
// import * as z from "zod";
import { ForgotPasswordSchema, VerifyPasswordSchema} from '@/schemas';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { CardWrapper } from "../card-wrapper";
import { BackButton } from "../back-button";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useTransition } from 'react';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { forgotPassword } from '@/actions/forgotPassword';
import { resetPassword } from '@/actions/resetPassword';
import { createNewPassword } from '@/actions/createNewPassword';
import { ImSpinner8 } from 'react-icons/im';
import { forgotUserPassword } from '@/store/user/userThunk';


const EmailSection = ({nextStep,setEmail}) => {

  const { userLoader } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

    const onSubmit = (values) => {
          let payload = {
            Email: values.email,
        }
        setEmail(values.email)
          dispatch(forgotUserPassword(
            {
              payload,
              onSuccess: (msg) => {
                  nextStep()
              },

              onError: (msg) => {
                setError(msg);
              }
              
            }))
    
    
  };

  return (
<CardWrapper
          headerText="Forgot-Password"
          headerPadding="pb-2"
          backButtonLabel="Go back to?"
          // backButtonHref="/auth/register"
          headerLogo
          className=""
        >          <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-mutedFields">
                        Enter Your Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={userLoader}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                       <FormError message={error} />
                       <FormSuccess message={success} />
                 <Button
            type="submit"
            className="w-full text-whitee rounded-full mt-8"
            disabled={userLoader}
          >
            {userLoader ?  <ImSpinner8 className="spinning-icon" />:"Submit"}
          </Button>
        </form>
      </Form>
                
                </CardWrapper>
  )
}

export default EmailSection