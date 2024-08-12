"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import HandleComponent from "./HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COLORS, FINISHES, MATERIALS, MODELS } from "../lib/validators";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RadioGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BASE_PRICE, PRODUCT_PRICES } from "../lib/products";
import { useUploadThing } from "./uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { argsTypes, saveConfig } from "../actions";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
  dimesnisons: {
    width: number;
    height: number;
  };
  imageUrl: string;
}

function DesignConfigurator(props: Props) {
  const { id, dimesnisons, imageUrl } = props;

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const { isUploading, startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["config"],
    mutationFn: async (args: argsTypes) => {
      await Promise.all([saveConfiguration(), saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview/?id=${id}`);
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  const [renderedDimension, setRenderedDimension] = useState({
    width: dimesnisons.width / 4,
    height: dimesnisons.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 150,
  });

  const { toast } = useToast();

  async function saveConfiguration() {
    // TODO: save configuration
    try {
      const { top: containerTop, left: containerLeft } =
        containerRef.current!.getBoundingClientRect();
      const {
        top: caseTop,
        left: caseLeft,
        width,
        height,
      } = caseRef.current!.getBoundingClientRect();
      const x = caseLeft - containerLeft;
      const y = caseTop - containerTop;

      const actualX = renderedPosition.x - x;
      const actualY = renderedPosition.y - y;

      console.log(
        renderedPosition.x,
        renderedPosition.y,
        x,
        y,
        actualX,
        actualY
      );

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;

      await new Promise((resolve) => {
        userImage.onload = resolve;
      });

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");

      const file = new File([blob], `fileName.png`, {
        type: "image/png",
      });

      await startUpload([file], { configId: id });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  function base64ToBlob(data: string, type: string) {
    const byteString = atob(data);
    const arrayBuffer = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }
    const uint8Array = new Uint8Array(arrayBuffer);
    return new Blob([uint8Array], { type });
  }

  return (
    <div className="relative mt-20 lg:grid grid-cols-3 mb-20 pb-20 flex flex-col">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl border-2 border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg flex items-center justify-center p-10"
      >
        <div
          className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831] "
          ref={caseRef}
        >
          <AspectRatio
            className="aspect-[896/1831] pointer-events-none select-none z-50 relative"
            ratio={896 / 1831}
          >
            <NextImage src={"/phone-template.png"} alt="image" fill />
          </AspectRatio>
          <div className="absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] bg-red-500 shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 150,
            height: dimesnisons.height / 4,
            width: dimesnisons.width / 4,
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          onResizeStop={(e, direction, ref, delta, { x, y }) => {
            setRenderedDimension({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          lockAspectRatio
          className="border-2 border-dashed border-primary rounded-lg"
          resizeHandleComponent={{
            topRight: <HandleComponent />,
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage src={imageUrl} alt="image" fill />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem]  flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            // aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>
            <div className="my-4 h-px w-full bg-zinc-300" />
            <div className="relative mt-4 h-full flex flex-col justify-between gap-6">
              <RadioGroup
                value={options.color}
                onChange={(val) =>
                  setOptions((prev) => ({ ...prev, color: val }))
                }
              >
                <Label className="">Color : {options.color.label}</Label>
                <div className="flex flex-row gap-x-4 mt-3">
                  {COLORS.map((color) => (
                    <RadioGroup.Option
                      className={({ active, checked }) =>
                        cn(
                          "border-2 border-transparent focus:ring-0 focus:outline-none p-0.5 rounded-full ",
                          {
                            [`border-${color.tw}`]: active || checked,
                          }
                        )
                      }
                      key={color.label}
                      value={color}
                    >
                      <span
                        className={`w-8 block h-8 rounded-full bg-${color.tw}`}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex flex-col gap-4">
                <Label className="">Model</Label>
                <div className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <DropdownMenuLabel className="border-2 flex w-36 items-center justify-around focus:outline-none">
                        {options.model.label}
                        <ChevronsUpDown className="w-4 h-4 ml-2" />
                      </DropdownMenuLabel>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36 focus:outline-none focus:ring-0">
                      <DropdownMenuLabel>Select Model</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.value}
                          onClick={() =>
                            setOptions((prev) => ({ ...prev, model }))
                          }
                          className={cn(
                            "focus:outline-none focus:ring-0 hover:bg-zinc-100 ",
                            {
                              "bg-zinc-100":
                                model.value === options.model.value,
                            }
                          )}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(
                  ({ name, options: SelectableOptions }) => {
                    return (
                      <RadioGroup
                        key={name}
                        value={options[name]}
                        className={"mt-4"}
                        onChange={(val) =>
                          setOptions((prev) => ({
                            ...prev,
                            [name]: val,
                          }))
                        }
                      >
                        <Label className="capitalize ">{name}</Label>
                        <div className="mt-3 space-y-4">
                          {SelectableOptions.map((option) => (
                            <RadioGroup.Option
                              key={option.value}
                              value={option}
                              className={({ active, checked }) =>
                                cn(
                                  "border-2 shadow-sm  border-zinc-100 focus:ring-0 focus:outline-none p-4 rounded-md",
                                  { "border-primary": active || checked }
                                )
                              }
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                  <p className=" font-medium">{option.label}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {option.description}
                                  </p>
                                </div>
                                <p className="text-sm">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(option.price / 100)}
                                </p>
                              </div>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    );
                  }
                )}
                <div className="flex items-center justify-between gap-x-6 mt-6">
                  <p className="font-semibold ">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      (BASE_PRICE +
                        PRODUCT_PRICES.material[options.material.value] +
                        PRODUCT_PRICES.finish[options.finish.value]) /
                        100
                    )}
                  </p>
                  <Button
                    disabled={isPending}
                    isLoading={isPending}
                    loadingText="Loading"
                    onClick={() =>
                      mutate({
                        id,
                        color: options.color.value,
                        material: options.material.value,
                        model: options.model.value,
                        finish: options.finish.value,
                      })
                    }
                    className="w-full"
                  >
                    {/* <Link href={"/cart"}> */}
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                    {/* </Link> */}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default DesignConfigurator;
