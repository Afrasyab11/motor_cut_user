"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { MdClose } from "react-icons/md";
import Image from "next/image";
import { baseDomain } from "@/utils/axios";
import ImageLoader from "./../../assets/images/ImageLoader.png";
export default function ViewImage({ item, open, setOpen }) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
     
    >
      <AlertDialogContent  onContextMenu={(e) => e.preventDefault()}
      draggable="false" className={` overflow-y-auto h-auto `}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[40px] sm:text-[15px] text-center font-normal flex justify-between pb-[20px] pt-[15px]">
              <p>Background Image</p>
              <button onClick={setOpen}>
                <MdClose size={35} />
              </button>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full flex justify-center items-center pt-6">
              <Image
                src={
                  item?.Path
                    ? `${baseDomain}get-file?filename=${item?.Path}`
                    : ImageLoader
                }
                className="w-full h-full "
                width={2000}
                height={2000}
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
