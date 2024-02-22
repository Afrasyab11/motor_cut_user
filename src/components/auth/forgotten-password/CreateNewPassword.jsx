import React from 'react'
import { CardWrapper } from '../card-wrapper'

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
import { forgotUserPassword, userNewPassword } from '@/store/user/userThunk';
import { CreatePasswordSchema } from "@/schemas";




const CreateNewPassword = ({email}) => {
    
  const { userLoader } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
    const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
        password: "",
        confirmPassword: "",
    },
  });

    const onSubmit = (values) => {
          let payload =
        {
            Email:email,
            NewPassword: values.password,
            ConfirmNewPassword:values.confirmPassword
          }
           dispatch(userNewPassword(
            {
              payload,
              onSuccess: (msg) => {

          router.push("/auth/login")
              },

              onError: (msg) => {
                setError(msg);
              }
              
            }))
    
    
  };

  return (
    <CardWrapper
    headerText="Forgot-Password"
    headerPadding="pb-2 mt-4"
    backButtonLabel="Go back to?"
    // backButtonHref="/auth/register"
    headerLogo
    className="mt-16"
  > 

<Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                             <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-mutedFields">
                        Enter Your New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="New Password"
                          type="password"
                          disabled={userLoader}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-mutedFields">
                        Enter Your Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
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
            className="w-full text-whitee rounded-full "
            disabled={userLoader}
          >
            {userLoader ?  <ImSpinner8 className="spinning-icon" />:"Submit"}
          </Button>
        </form>
      </Form>
  </CardWrapper>
  )
}

export default CreateNewPassword