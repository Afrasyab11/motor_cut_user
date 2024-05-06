"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import placeholder from "../../../public/placeholder.png";
import { useDispatch, useSelector } from "react-redux";
import { getchanngeBackgroundImageAction } from "@/store/background/backgroundThunk";
import ChangeBackgroudImage from "../modals/changeBackgroundModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  UpdateLogoPositionAction,
  createLogoAction,
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
  const [selectedValue, setSelectedValue] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
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
  useEffect(() => {
    if (logo && logo?.LogoPosition) {
      setSelectedValue(logo.LogoPosition);
    }
  }, [logo]);

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

  const handlePositionChange = (val) => {
    const formData = new FormData();
    formData.append("UserId", user.UserId);
    formData.append("LogoPosition", val);
    formData.append("DownloadFormat", null);
    // formData.append("Logo", null);
    if (selectedFile) {
      formData.append("Logo", selectedFile);
    }

    dispatch(
      createLogoAction({
        formData,
        onSuccess: () => {
          dispatch(getLogoAction(user.UserId));
        },
      })
    );
  };

  return (
    <div
      className="flex flex-col justify-between gap-y-2 min-h-[40vh]"
      onContextMenu={(e) => e.preventDefault()}
      draggable="false"
    >
      <div className="">
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
            className="w-full h-full object-fit min-h-[20vh] shadow rounded-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col  gap-y-2">
        <a
          onClick={handleBackgroundDialog}
          className="text-primary  text-sm sm:text-md font-medium cursor-pointer "
        >
          Change Background
        </a>
      </div>
      <div className="flex justify-between flex-wrap  items-center gap-3">
        <div className="flex flex-col justify-between   gap-x-2">
          <p className="text-sm sm:text-md"> Display Logo </p>{" "}
          <Switch
            checked={logo?.DisplayLogo}
            onCheckedChange={(isActive) => handleStatusChange(isActive)}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-primary-dark  my-auto min-w-[100px] text-wrap">
            Set Position:
          </p>
          <Select
            value={selectedValue}
            // {...field}
            className="border-none h-4 "
            onValueChange={(val) => {
              // field.onChange(val);
              handlePositionChange(val);
              // setSelectedValue(val);
            }}
          >
            <SelectTrigger className="w-full  border border-gray-500 rounded-full text-primary-dark">
              <SelectValue placeholder={selectedValue} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Positions</SelectLabel> */}
                <SelectItem value="top-left">Top Left</SelectItem>
                <SelectItem value="top-center">Top Center</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
