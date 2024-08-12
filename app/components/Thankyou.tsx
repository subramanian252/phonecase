"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPaymentStatus } from "../actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "./PhonePreview";

interface Props {}

function Thankyou(props: Props) {
  const {} = props;

  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId: orderId as string }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined)
    return (
      <div className="mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 animate-spin" />
          <h3 className="text-2xl font-semibold">Loading your order....</h3>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );

  if (data === false)
    return (
      <div className="mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 animate-spin" />
          <h3 className="text-2xl font-semibold">veryfying your payment</h3>
          <p className="text-muted-foreground">This might take a moment</p>
        </div>
      </div>
    );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-28">
        <div className="max-w-xl">
          <p className="text-xl font-semibold  text-primary">Thank you</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Your case is on the way
          </h2>
          <p className="mt-4 text-muted-foreground text-base">
            we've received the order and now processing it
          </p>
          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order Number</p>
            <p className="mt-2 text-zinc-500">{data?.id}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              We at CaseCobra believe that a phone case doesn't only need to
              look good, but also last you for the years to come. We offer a
              5-year print guarantee: If you case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>
        <div className="flex space-x-6 overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl mt-10">
          <PhonePreview
            caseColor={data?.configuration.caseColor as string}
            croppedImgSrc={data?.configuration.croppedImageUrl || ""}
          />
        </div>

        <div className="grid grid-cols-2 gap-10  py-10">
          <div className="space-y-1 ">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <p className="text-sm text-muted-foreground">
              {data?.shippingAddress?.street}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.shippingAddress?.city}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.shippingAddress?.state}
            </p>
            <p className="text-sm text-muted-foreground flex gap-x-2">
              <span>{data?.shippingAddress?.postalCode}</span>
              <span>{data?.shippingAddress?.country}</span>
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg  font-semibold">Billing Address</h2>
            <p className="text-sm text-muted-foreground">
              {data?.billingAddress?.street}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.billingAddress?.city}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.billingAddress?.state}
            </p>
            <p className="text-sm text-muted-foreground ">
              <span>{data?.billingAddress?.postalCode}</span>
              <span>{data?.billingAddress?.country}</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 py-10">
          <div className="space-y-1 ">
            <h2 className="text-lg font-semibold">Payment Status</h2>
            <p className="text-sm text-muted-foreground">Paid</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg block  font-semibold">Shipping method</h2>
            <p className="text-sm text-muted-foreground">
              DHL, takes up to 3 days to ship
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
