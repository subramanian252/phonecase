"use client";

import { CaseColor, Configuration } from "@prisma/client";
import React, { useEffect } from "react";

import Confetti from "react-dom-confetti";
import Phone from "./Phone";
import { ArrowRight, Check } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICES } from "../lib/products";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createPaymentSession } from "../actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import DialogModel from "./DialogModel";
import { COLORS } from "../lib/validators";
import { unstable_noStore as nostore } from "next/cache";

interface Props {
  configuration: Configuration;
}

function DesignPreview(props: Props) {
  nostore();
  const { configuration } = props;

  const [showConfetti, setShowConfetti] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);

  const { user } = useKindeBrowserClient();

  const router = useRouter();

  const { toast } = useToast();

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === configuration.caseColor
  )?.tw;

  console.log(`bg-${tw}`);

  console.log(user);

  const { mutate } = useMutation({
    mutationKey: ["payment"],
    mutationFn: createPaymentSession,
    onSuccess: ({ url }) => router.push(url as string),
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (user) {
      mutate(configuration.id);
    } else {
      localStorage.setItem("configId", configuration.id);
      setShowDialog(true);
    }
  };

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden absolute inset-0 flex justify-center"
      >
        <DialogModel showDialog={showDialog} setShowDialog={setShowDialog} />
        <Confetti
          active={showConfetti}
          config={{ spread: 90, elementCount: 300 }}
        />
      </div>
      <div className="flex flex-col md:flex-row p-6 lg:p-0 mt-20 w-full gap-20">
        <div className="lg:w-1/5 md:w-48 w-8/10">
          <Phone
            imgSrc={configuration.croppedImageUrl as string}
            className={`bg-${tw}`}
          />
        </div>
        <div className="lg:w-4/5 w-full flex-1 flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold">Your Iphone X case</h1>
          <div className="flex gap-x-2 items-center">
            <Check className="text-green-600 2-5 h-5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              in stock and ready to ship{" "}
            </p>
          </div>
          <div className="mt-8 flex flex-col lg:flex-row gap-y-10 justify-between">
            <ol className="list-disc list-inside text-zinc-700">
              <h1 className="font-semibold mb-3">Highlights</h1>
              <li>Wireless charging compatible</li>
              <li>TPU Shock Absorbtion</li>
              <li>Packaging made from recycled materials</li>
              <li>5 year print warranty</li>
            </ol>
            <ol className="list-disc list-inside text-zinc-700">
              <h1 className="font-semibold mb-3">Materials</h1>
              <li>High Quality, duarble material</li>
              <li>Scratch and fingerprint resistant</li>
            </ol>
          </div>
          <div className="mt-8 bg-blue-100/10 w-full rounded-md flex flex-col gap-3 p-2">
            <h1 className="font-semibold mb-3 text-xl ">Price Breakdown</h1>
            <div className="flex justify-between items-center ">
              <span className="text-zinc-600 text-base">Base Price:</span>
              <span className="text-base">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(BASE_PRICE / 100)}
              </span>
            </div>
            {configuration.caseMaterial == "polycarbonate" && (
              <div className="flex justify-between items-center ">
                <span className="text-zinc-600 text-base">
                  Soft PolyCarbonate Material
                </span>
                <span className="text-base">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    PRODUCT_PRICES.material[configuration?.caseMaterial] / 100
                  )}
                </span>
              </div>
            )}

            {configuration.caseFinish == "textured" && (
              <div className="flex justify-between items-center ">
                <span className="text-zinc-600 text-base">
                  Soft Textured Finish
                </span>
                <span className="text-base">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    PRODUCT_PRICES.finish[configuration?.caseFinish] / 100
                  )}
                </span>
              </div>
            )}
            <div className="w-full h-[1px] mt-6 bg-zinc-300 " />
            <div className="mt-4 flex justify-between items-center ">
              <span className="text-primary/80 text-base font-bold">
                Order Total
              </span>
              <span className="text-base text-primary">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  (BASE_PRICE +
                    PRODUCT_PRICES.material[
                      configuration.caseMaterial || "silicone"
                    ] +
                    PRODUCT_PRICES.finish[
                      configuration.caseFinish || "smooth"
                    ]) /
                    100
                )}
              </span>
            </div>
          </div>
          <div className="mt-6 w-full flex justify-end">
            <Button
              //   isLoading
              //   loadingText="Loading"
              //   disabled={true}
              className="ml-auto p-4 lg:px-8"
              onClick={handleCheckout}
            >
              Check Out <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignPreview;
