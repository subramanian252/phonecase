"use client";

interface Props {}

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/preview",
  },
];

function Steps(props: Props) {
  const {} = props;

  const pathname = usePathname();

  return (
    <ol className="rounded-md pt-2 bg-white flex lg:flex-row flex-col gap-x-0 lg:rounded-none lg:border-l lg:border-r lg:border-gray-200 ">
      {STEPS.map(({ name, description, url }, i) => {
        const isActive = pathname.endsWith(url);

        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        );

        const imgPath = `/snake-${i + 1}.png`;

        return (
          <li key={name} className="relative flex-1">
            <div
              className={cn(
                " flex items-center gap-x-14 p-6 lg:p-2 lg:border-b-2 border-l-2 border-muted-foreground lg:border-l-0 lg:h-32",
                isActive &&
                  "lg:border-b-4 lg:border-l-0 border-l-4 border-green-500"
              )}
            >
              <div className="w-12 h-12">
                <img src={imgPath} className="lg:mx-8 mx-2 w-full h-full  " />
              </div>
              <div className="flex flex-col gap-y-2 ">
                <p
                  className={cn("text-lg font-semibold", {
                    "text-green-500 font-bold": isActive,
                    "text-muted-foreground font-medium": isCompleted,
                  })}
                >
                  {name}
                </p>
                <p className="text-muted-background">{description}</p>
              </div>
            </div>
            {i !== 0 ? (
              <div className="absolute inset-0 hidden w-3 lg:block ">
                <svg
                  className="h-full w-full text-gray-300"
                  viewBox="0 0 12 82"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.5 0V31L10.5 41L0.5 51V82"
                    stroke="currentcolor"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default Steps;
