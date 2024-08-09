"use client";

import React, { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

interface Props {}

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray(array: string[], numOfParts: number) {
  const result: string[][] = [];
  for (var i = 0; i < array.length; i++) {
    const index = i % numOfParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => {
        return (
          <Review
            key={reviewIndex}
            imgSrc={imgSrc}
            className={reviewClassName?.(reviewIndex % reviews.length)}
          />
        );
      })}
    </div>
  );
}

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function ReviewGrid() {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, { amount: 0.4, once: true });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={ref}
      className="relative -mx-4 mt-16 grid h-[49rem]   grid-cols-1 gap-8 overflow-hidden sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            msPerPixel={10}
            reviewClassName={(reviewIndex) => {
              return cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              });
            }}
          />
          <ReviewColumn
            reviews={[...column3[1], ...column2]}
            msPerPixel={15}
            className="md:block hidden"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg-hidden" : ""
            }
          />
          <ReviewColumn
            reviews={[...column3.flat()]}
            msPerPixel={10}
            className="md:block hidden"
          />
        </>
      ) : null}
    </div>
  );
}

function Reviews(props: Props) {
  const {} = props;

  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </MaxWidthWrapper>
  );
}

export default Reviews;

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];
  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-3 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ "--animation-delay": animationDelay } as React.CSSProperties}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}
