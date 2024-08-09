import Image from "next/image";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Check, Section, Star } from "lucide-react";
import Phone from "./components/Phone";
import { Icons } from "./lib/Icons";
import Reviews from "./components/Reviews";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4 ">
            <div className="relative mx-auto text-center flex flex-col items-center lg:items-start lg:text-left ">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img src="/snake-1.png" className="w-full" alt="snake" />
              </div>
              <h1 className="w-fit relative font-bold text-5xl lg:text-7xl md:text-6xl tracking-tight !leading-tight lg:mt-16 ">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 text-center lg:text-left max-w-prose text-balance md:text-wrap">
                Capture your favourite memories with your own,{" "}
                <span className="font-bold">one-of-one</span> phone case.
                CaseCobra allows you to protext your memories, not just your
                phone.
              </p>
              <ul className="mt-8 flex flex-col gap-y-2">
                <li className="flex gap-x-2 items-center text-left">
                  <Check className="text-green-600 2-5 h-5 shrink-0" />
                  High Quality, duarble material
                </li>
                <li className="flex gap-x-2 items-center text-left">
                  <Check className="text-green-600 2-5 h-5 shrink-0" />5 years
                  print guarantee
                </li>
                <li className="flex gap-x-2 items-center text-left">
                  <Check className="text-green-600 2-5 h-5 shrink-0" />
                  Modern Iphones models supported
                </li>
              </ul>
              <div className="lg:flex gap-x-6 items-center">
                <div className="flex flex-row -space-x-4 mt-8">
                  <img
                    src="/users/user-1.png"
                    className="w-10 h-10 rounded-full ring-2 ring-green-600"
                  />
                  <img
                    src="/users/user-2.png"
                    className="w-10 h-10 rounded-full ring-2 ring-green-600"
                  />
                  <img
                    src="/users/user-3.png"
                    className="w-10 h-10 rounded-full ring-2 ring-green-600"
                  />
                  <img
                    src="/users/user-4.jpg"
                    className="w-10 h-10 rounded-full ring-2 ring-green-600"
                  />
                  <img
                    src="/users/user-5.jpg"
                    className="w-10 h-10 rounded-full ring-2 ring-green-600 object-cover"
                  />
                </div>
                <div>
                  <div className="mt-8 flex gap-x-1 items-center">
                    <Star className="w-4 h-4 text-green-500 fill-green-500" />
                    <Star className="w-4 h-4 text-green-500 fill-green-500" />
                    <Star className="w-4 h-4 text-green-500 fill-green-500" />
                    <Star className="w-4 h-4 text-green-500 fill-green-500" />
                    <Star className="w-4 h-4 text-green-500 fill-green-500" />
                  </div>
                  <p className="mt-2 text-sm">
                    <span className="text-green-600 font-bold">1250</span> happy
                    customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1  flex flex-col items-center px-8 sm:px-16 mt-32 lg:max-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                className="w-40 hidden absolute -top-28 -right-20 lg:block"
              />
              <img
                src="/line.png"
                className=" absolute -bottom-6 -left-6 w-20 mt-10"
              />
              <Phone imgSrc="/testimonials/1.jpg" className="w-64" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="lex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 justify-center">
            <h2 className="order-1 mt-2 !leading-tight tracking-tight text-center text-balance font-bold text-5xl md:text-6xl lg:text-7xl">
              What our{" "}
              <span className="px-2 relative">
                Customers{" "}
                <Icons.underline className="hidden sm:block text-green-500 absolute -bottom-6 inset-x-0" />{" "}
              </span>{" "}
              say
            </h2>
            <img src="/snake-2.png" className="w-24 order-0 lg:order-2" />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mt-8 flex gap-x-1 items-center">
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  The case feels durable and i even got a compliment on the
                  design. Had the case for two and a half months now
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is clear
                  </span>{" "}
                  , on the case i had before, the image started fading into
                  yellow-ish color after a couple weeks
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is clear
                  </span>{" "}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="w-12 object-cover rounded-full ring-2 ring-green-600"
                  src="/users/user-1.png"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-bold">Jonas</p>
                  <div className="flex gap-1 items-center text-zinc-500">
                    <Check className="w-4 h-4 text-green-500 stroke-[3px]" />
                    <p className="text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mt-8 flex gap-x-1 items-center">
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  The case feels durable and i even got a compliment on the
                  design. Had the case for two and a half months now
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is clear
                  </span>{" "}
                  , on the case i had before, the image started fading into
                  yellow-ish color after a couple weeks
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="w-12 object-cover rounded-full ring-2 ring-green-600"
                  src="/users/user-2.png"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-bold">Jill</p>
                  <div className="flex gap-1 items-center text-zinc-500">
                    <Check className="w-4 h-4 text-green-500 stroke-[3px]" />
                    <p className="text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mt-8 flex gap-x-1 items-center">
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  The case feels durable and i even got a compliment on the
                  design. Had the case for two and a half months now
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is clear
                  </span>{" "}
                  , on the case i had before, the image started fading into
                  yellow-ish color after a couple weeks
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="w-12 object-cover rounded-full ring-2 ring-green-600"
                  src="/users/user-3.png"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-bold">Mariana</p>
                  <div className="flex gap-1 items-center text-zinc-500">
                    <Check className="w-4 h-4 text-green-500 stroke-[3px]" />
                    <p className="text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mt-8 flex gap-x-1 items-center">
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
                <Star className="w-5 h-5 text-green-500 fill-green-500" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  The case feels durable and i even got a compliment on the
                  design. Had the case for two and a half months now
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is clear
                  </span>{" "}
                  , on the case i had before, the image started fading into
                  yellow-ish color after a couple weeks
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="w-12 object-cover rounded-full ring-2 ring-green-600"
                  src="/users/user-4.jpg"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-bold">John</p>
                  <div className="flex gap-1 items-center text-zinc-500">
                    <Check className="w-4 h-4 text-green-500 stroke-[3px]" />
                    <p className="text-sm">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="max-w-2xl mx-auto sm:text-center">
              <h2 className="order-1 mt-2 !leading-tight tracking-tight text-center text-balance font-bold text-5xl md:text-6xl lg:text-7xl">
                Upload your photos and get{" "}
                <span className="px-2 bg-green-600 text-white">your case</span>{" "}
                now
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                className="absolute top-[25rem] md:top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 rotate-90 md:rotate-0 "
              />

              <div className="relative md:h-full h-80 mx-auto w-full  bg-red-950 max-w-sm">
                <img
                  src="/horse.jpg"
                  className="rounded-md object-cover shadow-2xl ring-1 ring-gray-900/10 w-full h-full"
                />
              </div>
              <Phone imgSrc="/horse_phone.jpg" className="w-60" />
            </div>
          </div>
          <ul className="mt-8 lg:mt-16 lg:text-xl w-full mx-auto flex flex-col items-start max-w-sm gap-4 sm:text-lg">
            <li className="flex gap-x-2 ">
              <Check className="text-green-600 2-5 h-5 shrink-0" />
              High Quality, duarble material
            </li>
            <li className="flex gap-x-2 ">
              <Check className="text-green-600 2-5 h-5 shrink-0" />
              Wireless Charging Compatible
            </li>
            <li className="flex gap-x-2 ">
              <Check className="text-green-600 2-5 h-5 shrink-0" />
              Scratch Resistant
            </li>
            <li className="flex gap-x-2 ">
              <Check className="text-green-600 2-5 h-5 shrink-0" />5 years print
              warranty
            </li>
            <div className="flex justify-center w-full mt-8">
              <Link
                href="/upload"
                className={buttonVariants({
                  size: "lg",
                  className: "",
                })}
              >
                Create your case Now{" "}
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
