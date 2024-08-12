"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React, { useEffect, useRef } from "react";
import { COLORS } from "../lib/validators";

interface Props {
  caseColor: string;
  croppedImgSrc: string;
}

function PhonePreview(props: Props) {
  const { caseColor, croppedImgSrc } = props;

  const [renderedDimensions, setRenderedDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === caseColor
  )?.tw;

  const handleResize = () => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setRenderedDimensions({
        width,
        height,
      });
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(renderedDimensions.width / (1216 / 121));

  const ref = useRef<HTMLDivElement>(null);

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative ">
      <div
        className=" absolute z-20 scale-[1.0532] "
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          width={renderedDimensions.width / (3000 / 637)}
          alt="phone"
          src={croppedImgSrc}
          className={`phone-skew pointer-events-none h-full antialiased rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px] bg-${tw}`}
        />
      </div>
      <div className="relative h-full w-full z-40">
        <img
          alt="phone"
          src="/clearphone.png"
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
}

export default PhonePreview;
