"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import placeholder from "../../../public/placeholder.png";
import { useDispatch, useSelector } from "react-redux";
import { getchanngeBackgroundImageAction } from "@/store/background/backgroundThunk";
import ChangeBackgroudImage from "../modals/changeBackgroundModal";
import {
  UpdateLogoPositionAction,
  getLogoAction,
} from "@/store/uploadLogo/logoThunk";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
const SettingsCard = () => {
  const dispatch = useDispatch();
  const { background, backgroundLoader } = useSelector(
    (state) => state.background
  );
  const { logo } = useSelector((state) => state?.logo);

  let userString = getCookie("user");

  let user = userString ? JSON.parse(userString) : null;
  const [isBacgroundDialog, setBackgroundDialog] = useState(false);
  const handleBackgroundDialog = () => setBackgroundDialog(true);
  const handleCloseBackground = () => setBackgroundDialog(false);

  useEffect(() => {
    if (user?.UserId) {
      dispatch(getchanngeBackgroundImageAction(user?.UserId));
    }
  }, [user?.UserId]);

  useEffect(() => {
    dispatch(getLogoAction(user?.UserId));
  }, [user?.UserId]);
  const handleStatusChange = (isActive) => {
    const status = isActive ? "true" : "false";
    dispatch(
      UpdateLogoPositionAction({
        UserId: user?.UserId,
        Position: status,
        onSuccess: () => {
          // dispatch(UpdateLogoPositionAction(user?.UserId));
          dispatch(getLogoAction(user?.UserId));
        },
      })
    );
  };
  return (
    <div className="flex flex-col justify-between min-h-[40vh]">
      <div className="">
        {/* <Image
          className="rounded-lg w-80"
          alt=""
          src={background?.BackgroundImage?`${baseDomain}get-file?filename=${background?.BackgroundImage}`:TestImg}
          width={30}
          height={30}
        ></Image> */}
        <div className="rounded-2xl">
          <Image
            src={
              background?.BackgroundImage !== undefined &&
              background?.BackgroundImage
                ? `${baseDomain}get-file?filename=${background?.BackgroundImage}`
                : placeholder
            }
            alt={"bg"}
            width={1600}
            height={900}
            // className="w-full h-full object-cover rounded-2xl"
            className="w-full h-full object-cover shadow rounded-2xl"
          />
        </div>
      </div>
      <div>
        <a
          onClick={handleBackgroundDialog}
          className="text-primary text-sm sm:text-md font-medium cursor-pointer mt-2"
          // href="#"
        >
          Change Background
        </a>
        <div className="flex gap-4 ">
          <p className="text-sm sm:text-md"> Display Logo </p>{" "}
          <Switch
            checked={logo?.DisplayLogo}
            onCheckedChange={(isActive) => handleStatusChange(isActive)}
          />
        </div>
      </div>
      {isBacgroundDialog && (
        <ChangeBackgroudImage
          open={isBacgroundDialog}
          setOpen={handleCloseBackground}
          backgroundLoader={backgroundLoader}
        />
      )}
    </div>
  );
};

export default SettingsCard;
