import React, { useEffect, useState } from 'react'

const ResendCode = () => {


  const [timer, setTimer] = useState(0);

    const reSendMail = () => {
        // const payload={
        //   Email: formData.email
        // }
        // dispatch(sendSignUpOTP(
        //   { payload,
        //     onSuccess:()=>{
          
          //     }
          //   }))
                setTimer(60);
    
      }
  const isResendDisabled =  timer > 0;
useEffect(() => {
  let interval;
  if (timer > 0) {
    interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [timer]);
  return (
    <div className="my-8 text-slate-500"
    >

  {timer > 0 ?<div>Resend code in {timer}s</div> : <div className="cursor-pointer" onClick={reSendMail}>{" Didn't receive the code? Resend code"}</div> 
    }
    </div>
  )
}

export default ResendCode