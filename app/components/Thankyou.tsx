"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPaymentStatus } from "../actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

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
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-28">
        <div className="max-w-xl">
          <p className="text-base font-semibold uppercase tracking-wider text-indigo-600">
            Thank you
          </p>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
