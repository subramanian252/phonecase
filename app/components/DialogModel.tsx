import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

interface Props {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogModel(props: Props) {
  const { showDialog, setShowDialog } = props;

  return (
    <Dialog onOpenChange={setShowDialog} open={showDialog}>
      <DialogContent className="absolute z-[99999]">
        <DialogHeader>
          <div className="relative mx-auto w-24 h-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          <DialogTitle className="text-center text-3xl font-bold">
            Login to continue
          </DialogTitle>
          <DialogDescription className="text-center text-base py-2">
            <span className="font-medium text-gray-900">
              your config is saved
            </span>
            , please login to purchase the case
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-x-6 w-full px-6">
          <LoginLink
            className={`flex-1 ${buttonVariants({
              size: "lg",
              variant: "outline",
            })}`}
          >
            Login
          </LoginLink>
          <RegisterLink
            className={`flex-1 ${buttonVariants({
              size: "lg",
              variant: "default",
            })}`}
          >
            SignUp
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogModel;
