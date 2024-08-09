import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <footer className="bg-white h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200"></div>
        <div className="h-20 flex items-center flex-col gap-y-2 mt-2 md:flex-row justify-between md:items-center">
          <p className="text-muted-foreground">© 2024 All rights reserved</p>
          <div className="flex flex-row gap-x-4">
            <Link href={"/"} className="text-muted-foreground text-sm">
              Terms
            </Link>
            <Link href={"/"} className="text-muted-foreground text-sm">
              Privacy Policy
            </Link>
            <Link href={"/"} className="text-muted-foreground text-sm">
              Cookies Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;
