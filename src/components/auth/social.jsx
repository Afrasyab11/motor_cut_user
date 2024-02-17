"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import  firebase from "@/config/firebase"
import { loginUser } from "@/store/user/userThunk";
import { useDispatch } from "react-redux";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

export const Social = ({ socialBtnText }) => {


 const dispatch=useDispatch()

 const router=useRouter()
 const [isPending, startTransition] = useTransition();
 console.log('isPending: ', isPending);

  const signUpWithGoogle = () => {
    
    startTransition(() => {const provider = new firebase.auth.GoogleAuthProvider();
       firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("result >>>", result?.user);
        const {email,displayName} = result?.user;
        console.log('email: ', email);
        let payload={
          Email: email,
          Name:displayName,
          isAdmin:false
        }
        dispatch(loginUser(
          { payload,
            onSuccess:()=>{
              router.push('/main/dashboard')
            },
            onError: (msg) => {
              setError(msg);
            }
          }))
      })
      .catch((error) => {
        console.log("error >>> ", error);
      });})
   
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full flex justify-center items-center rounded-full border-black"
        variant="outline"
        onClick={signUpWithGoogle}
      >
        <FcGoogle className="h-7 w-7" />
   {isPending?<div>logining</div>:<p className="grow pr-6 text-black ">{socialBtnText}</p>}     
      </Button>
      {/* <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
                <FaGithub className="h-5 w-5"/>
            </Button> */}

    </div>
  );
};
