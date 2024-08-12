"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { changeStatus } from "../actions";
import { useRouter } from "next/navigation";

interface Props {
  status: OrderStatus;
  orderId: string;
}

function DropDown(props: Props) {
  const {} = props;

  const router = useRouter();

  const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: "Awaiting Shipment",
    shipped: "Shipped",
    fulfilled: "Delivered",
  };

  const { mutate } = useMutation({
    mutationKey: ["orderStatus"],
    mutationFn: async (status: OrderStatus) =>
      await changeStatus({ orderId: props.orderId, status }),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" bg-gray-100 " asChild>
        <Button className=" w-48 flex justify-between" variant={"outline"}>
          <p>{LABEL_MAP[props.status]}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(OrderStatus).map((key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => mutate(key as OrderStatus)}
            className={cn(
              "hover:bg-gray-100",
              LABEL_MAP[props.status] ===
                LABEL_MAP[key as keyof typeof OrderStatus]
                ? "bg-gray-100"
                : ""
            )}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                LABEL_MAP[key as keyof typeof OrderStatus] ===
                  LABEL_MAP[props.status]
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
            {LABEL_MAP[key as keyof typeof OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
