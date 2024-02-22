// "use client";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { payloadSchema } from "@/schemas/advertFromValidation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import UploadImages from "../modals/UploadImages";
// import { getCookie } from "cookies-next";
// export default function AdvertForm() {
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const handleOpenDialog = () => setDialogOpen(true);
//   const handleCloseDialog = () => setDialogOpen(false);
//   let userString = getCookie("user");
//   let user = userString ? JSON.parse(userString) : null;
  
//   const [payload, setPayload] = useState({
//     UserId: user.UserId,
//     Label: "",
//     CutType: "Half Cut", // Default value
//     TrimImages: false, // Default value, assuming 'off' maps to `false`
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(payloadSchema),
//   });
//   const handleChange = (field, value) => {
//     // Special handling for fields that need boolean values
//     if (field === "TrimImages") {
//       value = value === "on" ? true : false;
//     }
//     setPayload({
//       ...payload,
//       [field]: value,
//     });
//   };
//   return (
//     <div className="bg-site_secondary px-8 pt-4">
//       <div className="my-2">
//         <label htmlFor="cutType" className="text-sm sm:text-md m ">
//           Advert Label
//         </label>
//         <Input
//         {...register("Label")}
//           className="mt-2 bg-primary[light]"
//           name="Label"
//           placeholder="Advert Label"
//           value={payload?.Label}
//           onChange={(e) => handleChange(e.target.name, e.target.value)}
//           type="text"
//         />
//          {errors.Label && <small className="text-red-500">{errors.Label.message}</small>}

//       </div>

//       <div className="mb-2">
//         <label htmlFor="cutType" className="text-sm sm:text-md ">
//           Select Cut Type
//         </label>
//         <div className="grid grid-cols-2 gap-8 mt-2">
//           <button
//             className={`rounded-full p-1 sm:p-3 md:p-2 text-sm sm:text-md ${
//               payload?.CutType === "Half Cut"
//                 ? "bg-primary text-whitee"
//                 : "bg-whitee text-primary border border-gray-500 "
//             }`}
//             onClick={() => handleChange("CutType", "Half Cut")}
//           >
//             Half Cut
//           </button>
//           <button
//             className={`rounded-full p-1 sm:p-3 md:p-2 text-sm sm:text-md ${
//               payload?.CutType === "Full Cut"
//                 ? "bg-primary text-whitee"
//                 : "bg-whitee text-primary border border-gray-500 "
//             }`}
//             onClick={() => handleChange("CutType", "Full Cut")}
//           >
//             Full Cut
//           </button>
//         </div>
//       </div>
//      {payload?.CutType =="Half Cut" && <div className="mb-2">
//         <label className="block text-gray-700 mb-2">Trim Images</label>
//         <div className="grid grid-cols-2 gap-8 mt-2">
//           <button
//             className={`rounded-full  sm:p-3 md:p-2 text-sm sm:text-md ${
//               payload?.TrimImages === true
//                 ? "bg-primary text-whitee"
//                 : "bg-whitee text-primary border border-gray-500 "
//             }`}
//             onClick={() => handleChange("TrimImages", "on")}
//           >
//             On
//           </button>
//           <button
//             className={`rounded-full p-1 sm:p-3 md:p-2 text-sm sm:text-md ${
//               payload?.TrimImages === false
//                 ? "bg-primary text-whitee"
//                 : "bg-whitee text-primary border border-gray-500 "
//             }`}
//             onClick={() => handleChange("TrimImages", "off")}
//           >
//             Off
//           </button>
//         </div>
//       </div>}
//       <div className="my-4">
//         <hr className="text-black h-[2px] bg-gray-500" />
//       </div>
//       <div className="">
//         <div className="text-center">
//           <button
//             onClick={handleSubmit(handleOpenDialog)}
//             className="border rounded-full border-black px-8 py-2 text-sm sm:text-md"
//           >
//             Upload Images
//           </button>
//         </div>
//       </div>
//       {isDialogOpen && (
//         <UploadImages
//           payload={payload}
//           open={isDialogOpen}
//           setOpen={handleCloseDialog}
//         />
//       )}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { payloadSchema } from "@/schemas/advertFromValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImages from "../modals/UploadImages";
import { getCookie } from "cookies-next";
export default function AdvertForm() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  let userString = getCookie("user");
let user = userString ? JSON.parse(userString) : null;
  const [payload, setPayload] = useState({
    UserId: user?.UserId,
    isAdmin:false,
    Label: "",
    CutType: "Half Cut", 
    TrimImages: false, 
  });
  const { register,reset, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(payloadSchema),
  });
  const handleChange = (field, value) => {
    // Special handling for fields that need boolean values
    if (field === "TrimImages") {
      value = value === "on" ? true : false;
    }
    setPayload({
      ...payload,
      [field]: value,
    });
  };
  return (
    <div className="bg-site_secondary px-8 pt-4">
      <div className="my-2">
        <label htmlFor="cutType" className="text-sm sm:text-md m ">
          Advert Label
        </label>
        <Input
        {...register("Label")}
          className="mt-2 bg-primary[light]"
          name="Label"
          placeholder="Advert Label"
          value={payload?.Label}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          type="text"
        />
         {errors.Label && <small className="text-red-500">{errors.Label.message}</small>}
      </div>
      <div className="mb-2">
        <label htmlFor="cutType" className="text-sm sm:text-md ">
          Select Cut Type
        </label>
        <div className="grid grid-cols-2 gap-8 mt-2">
          <button
            className={`rounded-full p-1 sm:p-3 md:p-2 text-sm sm:text-md ${
              payload?.CutType === "Half Cut"
                ? "bg-primary text-whitee"
                : "bg-whitee text-primary border border-gray-500 "
            }`}
            onClick={() => handleChange("CutType", "Half Cut")}
          >
            Half Cut
          </button>
          <button
            className={`rounded-full p-1 sm:p-3 md:p-2 text-sm sm:text-md ${
              payload?.CutType === "Full Cut"
                ? "bg-primary text-whitee"
                : "bg-whitee text-primary border border-gray-500 "
            }`}
            onClick={() => handleChange("CutType", "Full Cut")}
          >
            Full Cut
          </button>
        </div>
      </div>
     {payload.CutType=="Half Cut"  &&<div className="mb-2">
        <label className="block text-gray-700 mb-2">Trim Images</label>
        <div className="grid grid-cols-2 gap-8 mt-2">
          <button
            className={`rounded-full  sm:p-3 md:p-2 text-sm sm:text-md ${
              payload?.TrimImages === true
                ? "bg-primary text-whitee"
                : "bg-whitee text-primary border border-gray-500 "
            }`}
            onClick={() => handleChange("TrimImages", "on")}
          >
            On
          </button>
          <button
            className={`rounded-full p-1 sm:p-3 md:p-2 text-sm sm:text-md ${
              payload?.TrimImages === false
                ? "bg-primary text-whitee"
                : "bg-whitee text-primary border border-gray-500 "
            }`}
            onClick={() => handleChange("TrimImages", "off")}
          >
            Off
          </button>
        </div>
      </div>}
      <div className="my-4">
        <hr className="text-black h-[2px] bg-gray-500" />
      </div>
      <div className="">
        <div className="text-center">
          <button
            onClick={handleSubmit(handleOpenDialog)}
            className="border rounded-full border-black xs:px-4 sm:px-4 md:px-8 lg:px-8 py-2 text-sm sm:text-md"
          >
            Upload Images
          </button>
        </div>
      </div>
      {isDialogOpen && (
        <UploadImages
          payload={payload}
          open={isDialogOpen}
          setOpen={handleCloseDialog}
          setPayload={setPayload}
          reset={reset}
        />
      )}
    </div>
  );
}